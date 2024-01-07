import { JwtPayload } from 'jsonwebtoken';
import { offeredJourneyModel } from '../offeredJourney/offeredJourney.mode';
import AppError from '../../Error/AppError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { bookingModel } from './booking.model';
import { buyerModel } from '../Member/member.model';

const createBookingIntoDB = async (payload: any, buyer: JwtPayload) => {
  const { journey, slot } = payload;

  const isJourney = await offeredJourneyModel
    .findById(journey)
    .select('capacity slot date startTime');
  if (!isJourney) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Journey is not exists');
  }

  if (isJourney.capacity <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Bus is full You can't book right now",
    );
  }

  const allPresent: boolean = slot.every((team: string) =>
    isJourney.slot.includes(team),
  );

  if (!allPresent) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Your select seats are already sold',
    );
  }

  const user = await buyerModel
    .findOne({ id: buyer.id })
    .select('id name email contactNo');

  const booking = {
    userId: user?.id,
    userName: user?.name,
    userEmail: user?.email,
    contactNo: user?.contactNo,
    journeyDate: isJourney.date,
    startTime: isJourney.startTime,
    journey,
    seatNo: slot,
  };

  const query = {
    userId: user?.id,
    userName: user?.name,
    userEmail: user?.email,
    contactNo: user?.contactNo,
    journeyDate: isJourney.date,
    startTime: isJourney.startTime,
  };

  const isBookingAlreadyExists = await bookingModel.findOne(query);

  if (isBookingAlreadyExists) {
    if ((isBookingAlreadyExists?.seatNo.length as number) > 4) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'You already booking 4 seats on this day',
      );
    }

    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const newSeatNo: string[] = [...isBookingAlreadyExists.seatNo, ...slot];

      const newBook = await bookingModel.findByIdAndUpdate(
        isBookingAlreadyExists._id,
        {
          seatNo: newSeatNo,
        },
        { new: true, session },
      );

      if (!newBook) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Booking');
      }

      const newcapacity = isJourney.capacity - Number(slot.length);
      const filteredArray: string[] = isJourney.slot.filter(
        (item) => !slot.includes(item),
      );

      const updateJourney = await offeredJourneyModel.findByIdAndUpdate(
        journey,
        {
          capacity: newcapacity,
          slot: filteredArray,
        },
        { new: true, session },
      );

      if (!updateJourney) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to Update offered journey',
        );
      }

      await session.commitTransaction();
      await session.endSession();
      return newBook;
    } catch (error: any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(error);
    }
  } else {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const newcapacity = isJourney.capacity - Number(slot.length);
      const filteredArray: string[] = isJourney.slot.filter(
        (item) => !slot.includes(item),
      );

      const newBook = await bookingModel.create([booking], { session });

      if (!newBook.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Booking');
      }

      const updateJourney = await offeredJourneyModel.findByIdAndUpdate(
        journey,
        {
          capacity: newcapacity,
          slot: filteredArray,
        },
        { new: true, session },
      );

      if (!updateJourney) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to Update offered journey',
        );
      }

      await session.commitTransaction();
      await session.endSession();
      return newBook;
    } catch (error: any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(error);
    }
  }
};

const updateBookingIntoDB = async (
  id: string,
  payload: { oldSeat: string[]; newSeat: string[] },
  user: JwtPayload,
) => {
  const { oldSeat, newSeat } = payload;
  if (oldSeat.length !== newSeat.length) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Old seat number and New Seat Number doesn't match",
    );
  }
  const bookingSeat = await bookingModel.findById(id);

  const buyerByUser = await buyerModel
    .findOne({ id: bookingSeat?.userId })
    .select('id name email');
  const buyerBytoken = await buyerModel
    .findOne({ id: user?.id })
    .select('id name email');

  if (
    !(
      buyerBytoken?.id === buyerByUser?.id &&
      buyerBytoken?.name === buyerByUser?.name &&
      buyerBytoken?.email === buyerByUser?.email
    )
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, "You can't do that");
  }

  const isOldSeatPresent: boolean = oldSeat.some(
    (item) => bookingSeat?.seatNo.includes(item),
  );

  if (!isOldSeatPresent) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Given Old seats don't belong to you",
    );
  }

  const isNewSeatPresent: boolean = newSeat.some(
    (item) => bookingSeat?.seatNo.includes(item),
  );

  if (isNewSeatPresent) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Given New seats already belong to you',
    );
  }

  const filteredbookseat: string[] = bookingSeat?.seatNo.filter(
    (item) => !oldSeat.includes(item),
  ) as string[];

  const newSeatNo: string[] = [...filteredbookseat, ...newSeat];

  const journey = await offeredJourneyModel
    .findById(bookingSeat?.journey)
    .select('slot');

  const isNewSeatAvailabe: boolean = newSeat.some(
    (item) => journey?.slot.includes(item),
  );
  if (!isNewSeatAvailabe) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'The seat you want to book is already sold',
    );
  }

  const filteredofferseat: string[] = journey?.slot.filter(
    (item) => !newSeat.includes(item),
  ) as string[];

  const newOfferSeat = [...filteredofferseat, ...oldSeat];

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newBook = await bookingModel.findByIdAndUpdate(
      id,
      {
        seatNo: newSeatNo,
      },
      { new: true, session },
    );

    if (!newBook) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to Update Change Seat',
      );
    }

    const updateJourney = await offeredJourneyModel.findByIdAndUpdate(
      bookingSeat?.journey,
      {
        slot: newOfferSeat,
      },
      { new: true, session },
    );

    if (!updateJourney) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to Update Change Seat',
      );
    }

    await session.commitTransaction();
    await session.endSession();
    return newBook;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const deleteBookingFromDB = async (id: string, user: JwtPayload) => {
  const bookingSeat = await bookingModel.findById(id);

  if (!bookingSeat) {
    throw new AppError(httpStatus.BAD_REQUEST, 'You have no booking');
  }

  const buyerByUser = await buyerModel
    .findOne({ id: bookingSeat?.userId })
    .select('id name email');
  const buyerBytoken = await buyerModel
    .findOne({ id: user?.id })
    .select('id name email');

  if (
    !(
      buyerBytoken?.id === buyerByUser?.id &&
      buyerBytoken?.name === buyerByUser?.name &&
      buyerBytoken?.email === buyerByUser?.email
    )
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, "You can't do that");
  }

  const journeyTime = new Date(
    `${bookingSeat?.journeyDate}T${bookingSeat?.startTime}`,
  );
  const currentTime = new Date();

  const timeDifference = Math.abs(
    journeyTime.getTime() - currentTime.getTime(),
  );

  const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;

  if (timeDifference < twentyFourHoursInMilliseconds) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "The difference between journey time and current time is less than 24 hours. You can't cancel your ticket at this moment",
    );
  }

  const offeredJourney = await offeredJourneyModel
    .findById(bookingSeat?.journey)
    .select('slot capacity');

  const newcapacity =
    (offeredJourney?.capacity as number) + Number(bookingSeat?.seatNo.length);
  const newOfferSeat = [
    ...(bookingSeat?.seatNo as string[]),
    ...(offeredJourney?.slot as string[]),
  ];

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newBook = await bookingModel.findByIdAndDelete(id, { session });

    if (!newBook) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete Booking');
    }

    const updateJourney = await offeredJourneyModel.findByIdAndUpdate(
      bookingSeat?.journey,
      {
        capacity: newcapacity,
        slot: newOfferSeat,
      },
      { new: true, session },
    );

    if (!updateJourney) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete Booking');
    }

    await session.commitTransaction();
    await session.endSession();
    return newBook;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const getBookingFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  const queryBuilder = await bookingModel.find(queryObj);
  return queryBuilder;
};

export const bookingService = {
  createBookingIntoDB,
  updateBookingIntoDB,
  deleteBookingFromDB,
  getBookingFromDB,
};
