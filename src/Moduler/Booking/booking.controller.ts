import httpStatus from 'http-status';
import sendRespone from '../../utility/sendResponse';
import catchAsync from '../../utility/trycatch';
import { bookingService } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const result = await bookingService.createBookingIntoDB(req.body, req.user);

  sendRespone(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Ticket is Booked!!!',
    data: result,
  });
});
const updateBooking = catchAsync(async (req, res) => {
  const result = await bookingService.updateBookingIntoDB(
    req.params.id,
    req.body,
    req.user,
  );

  sendRespone(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Seat is changed successfully!!!',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const result = await bookingService.deleteBookingFromDB(
    req.params.id,
    req.user,
  );

  sendRespone(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Booking is Deleted successfully!!!',
    data: result,
  });
});
const getBooking = catchAsync(async (req, res) => {
  const result = await bookingService.getBookingFromDB(req.query);

  sendRespone(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Booking data is retrieved successfully!!!',
    data: result,
  });
});

export const bookingController = {
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
};
