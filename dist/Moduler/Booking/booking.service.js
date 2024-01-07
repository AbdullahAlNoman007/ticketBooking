"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const offeredJourney_mode_1 = require("../offeredJourney/offeredJourney.mode");
const AppError_1 = __importDefault(require("../../Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const booking_model_1 = require("./booking.model");
const member_model_1 = require("../Member/member.model");
const createBookingIntoDB = (payload, buyer) => __awaiter(void 0, void 0, void 0, function* () {
    const { journey, slot } = payload;
    const isJourney = yield offeredJourney_mode_1.offeredJourneyModel
        .findById(journey)
        .select('capacity slot date startTime');
    if (!isJourney) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Journey is not exists');
    }
    if (isJourney.capacity <= 0) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Bus is full You can't book right now");
    }
    const allPresent = slot.every((team) => isJourney.slot.includes(team));
    if (!allPresent) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Your select seats are already sold');
    }
    const user = yield member_model_1.buyerModel
        .findOne({ id: buyer.id })
        .select('id name email contactNo');
    const booking = {
        userId: user === null || user === void 0 ? void 0 : user.id,
        userName: user === null || user === void 0 ? void 0 : user.name,
        userEmail: user === null || user === void 0 ? void 0 : user.email,
        contactNo: user === null || user === void 0 ? void 0 : user.contactNo,
        journeyDate: isJourney.date,
        startTime: isJourney.startTime,
        journey,
        seatNo: slot,
    };
    const query = {
        userId: user === null || user === void 0 ? void 0 : user.id,
        userName: user === null || user === void 0 ? void 0 : user.name,
        userEmail: user === null || user === void 0 ? void 0 : user.email,
        contactNo: user === null || user === void 0 ? void 0 : user.contactNo,
        journeyDate: isJourney.date,
        startTime: isJourney.startTime,
    };
    const isBookingAlreadyExists = yield booking_model_1.bookingModel.findOne(query);
    if (isBookingAlreadyExists) {
        if ((isBookingAlreadyExists === null || isBookingAlreadyExists === void 0 ? void 0 : isBookingAlreadyExists.seatNo.length) > 4) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'You already booking 4 seats on this day');
        }
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const newSeatNo = [...isBookingAlreadyExists.seatNo, ...slot];
            const newBook = yield booking_model_1.bookingModel.findByIdAndUpdate(isBookingAlreadyExists._id, {
                seatNo: newSeatNo,
            }, { new: true, session });
            if (!newBook) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create Booking');
            }
            const newcapacity = isJourney.capacity - Number(slot.length);
            const filteredArray = isJourney.slot.filter((item) => !slot.includes(item));
            const updateJourney = yield offeredJourney_mode_1.offeredJourneyModel.findByIdAndUpdate(journey, {
                capacity: newcapacity,
                slot: filteredArray,
            }, { new: true, session });
            if (!updateJourney) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Update offered journey');
            }
            yield session.commitTransaction();
            yield session.endSession();
            return newBook;
        }
        catch (error) {
            yield session.abortTransaction();
            yield session.endSession();
            throw new Error(error);
        }
    }
    else {
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const newcapacity = isJourney.capacity - Number(slot.length);
            const filteredArray = isJourney.slot.filter((item) => !slot.includes(item));
            const newBook = yield booking_model_1.bookingModel.create([booking], { session });
            if (!newBook.length) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create Booking');
            }
            const updateJourney = yield offeredJourney_mode_1.offeredJourneyModel.findByIdAndUpdate(journey, {
                capacity: newcapacity,
                slot: filteredArray,
            }, { new: true, session });
            if (!updateJourney) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Update offered journey');
            }
            yield session.commitTransaction();
            yield session.endSession();
            return newBook;
        }
        catch (error) {
            yield session.abortTransaction();
            yield session.endSession();
            throw new Error(error);
        }
    }
});
const updateBookingIntoDB = (id, payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldSeat, newSeat } = payload;
    if (oldSeat.length !== newSeat.length) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Old seat number and New Seat Number doesn't match");
    }
    const bookingSeat = yield booking_model_1.bookingModel.findById(id);
    const buyerByUser = yield member_model_1.buyerModel
        .findOne({ id: bookingSeat === null || bookingSeat === void 0 ? void 0 : bookingSeat.userId })
        .select('id name email');
    const buyerBytoken = yield member_model_1.buyerModel
        .findOne({ id: user === null || user === void 0 ? void 0 : user.id })
        .select('id name email');
    if (!((buyerBytoken === null || buyerBytoken === void 0 ? void 0 : buyerBytoken.id) === (buyerByUser === null || buyerByUser === void 0 ? void 0 : buyerByUser.id) &&
        (buyerBytoken === null || buyerBytoken === void 0 ? void 0 : buyerBytoken.name) === (buyerByUser === null || buyerByUser === void 0 ? void 0 : buyerByUser.name) &&
        (buyerBytoken === null || buyerBytoken === void 0 ? void 0 : buyerBytoken.email) === (buyerByUser === null || buyerByUser === void 0 ? void 0 : buyerByUser.email))) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You can't do that");
    }
    const isOldSeatPresent = oldSeat.some((item) => bookingSeat === null || bookingSeat === void 0 ? void 0 : bookingSeat.seatNo.includes(item));
    if (!isOldSeatPresent) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Given Old seats don't belong to you");
    }
    const isNewSeatPresent = newSeat.some((item) => bookingSeat === null || bookingSeat === void 0 ? void 0 : bookingSeat.seatNo.includes(item));
    if (isNewSeatPresent) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Given New seats already belong to you');
    }
    const filteredbookseat = bookingSeat === null || bookingSeat === void 0 ? void 0 : bookingSeat.seatNo.filter((item) => !oldSeat.includes(item));
    const newSeatNo = [...filteredbookseat, ...newSeat];
    const journey = yield offeredJourney_mode_1.offeredJourneyModel
        .findById(bookingSeat === null || bookingSeat === void 0 ? void 0 : bookingSeat.journey)
        .select('slot');
    const isNewSeatAvailabe = newSeat.some((item) => journey === null || journey === void 0 ? void 0 : journey.slot.includes(item));
    if (!isNewSeatAvailabe) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'The seat you want to book is already sold');
    }
    const filteredofferseat = journey === null || journey === void 0 ? void 0 : journey.slot.filter((item) => !newSeat.includes(item));
    const newOfferSeat = [...filteredofferseat, ...oldSeat];
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newBook = yield booking_model_1.bookingModel.findByIdAndUpdate(id, {
            seatNo: newSeatNo,
        }, { new: true, session });
        if (!newBook) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Update Change Seat');
        }
        const updateJourney = yield offeredJourney_mode_1.offeredJourneyModel.findByIdAndUpdate(bookingSeat === null || bookingSeat === void 0 ? void 0 : bookingSeat.journey, {
            slot: newOfferSeat,
        }, { new: true, session });
        if (!updateJourney) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Update Change Seat');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newBook;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
const deleteBookingFromDB = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingSeat = yield booking_model_1.bookingModel.findById(id);
    if (!bookingSeat) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'You have no booking');
    }
    const buyerByUser = yield member_model_1.buyerModel
        .findOne({ id: bookingSeat === null || bookingSeat === void 0 ? void 0 : bookingSeat.userId })
        .select('id name email');
    const buyerBytoken = yield member_model_1.buyerModel
        .findOne({ id: user === null || user === void 0 ? void 0 : user.id })
        .select('id name email');
    if (!((buyerBytoken === null || buyerBytoken === void 0 ? void 0 : buyerBytoken.id) === (buyerByUser === null || buyerByUser === void 0 ? void 0 : buyerByUser.id) &&
        (buyerBytoken === null || buyerBytoken === void 0 ? void 0 : buyerBytoken.name) === (buyerByUser === null || buyerByUser === void 0 ? void 0 : buyerByUser.name) &&
        (buyerBytoken === null || buyerBytoken === void 0 ? void 0 : buyerBytoken.email) === (buyerByUser === null || buyerByUser === void 0 ? void 0 : buyerByUser.email))) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You can't do that");
    }
    const journeyTime = new Date(`${bookingSeat === null || bookingSeat === void 0 ? void 0 : bookingSeat.journeyDate}T${bookingSeat === null || bookingSeat === void 0 ? void 0 : bookingSeat.startTime}`);
    const currentTime = new Date();
    const timeDifference = Math.abs(journeyTime.getTime() - currentTime.getTime());
    const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;
    if (timeDifference < twentyFourHoursInMilliseconds) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "The difference between journey time and current time is less than 24 hours. You can't cancel your ticket at this moment");
    }
    const offeredJourney = yield offeredJourney_mode_1.offeredJourneyModel
        .findById(bookingSeat === null || bookingSeat === void 0 ? void 0 : bookingSeat.journey)
        .select('slot capacity');
    const newcapacity = (offeredJourney === null || offeredJourney === void 0 ? void 0 : offeredJourney.capacity) + Number(bookingSeat === null || bookingSeat === void 0 ? void 0 : bookingSeat.seatNo.length);
    const newOfferSeat = [
        ...bookingSeat === null || bookingSeat === void 0 ? void 0 : bookingSeat.seatNo,
        ...offeredJourney === null || offeredJourney === void 0 ? void 0 : offeredJourney.slot,
    ];
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newBook = yield booking_model_1.bookingModel.findByIdAndDelete(id, { session });
        if (!newBook) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Delete Booking');
        }
        const updateJourney = yield offeredJourney_mode_1.offeredJourneyModel.findByIdAndUpdate(bookingSeat === null || bookingSeat === void 0 ? void 0 : bookingSeat.journey, {
            capacity: newcapacity,
            slot: newOfferSeat,
        }, { new: true, session });
        if (!updateJourney) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Delete Booking');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newBook;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
const getBookingFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = Object.assign({}, query);
    const queryBuilder = yield booking_model_1.bookingModel.find(queryObj);
    return queryBuilder;
});
exports.bookingService = {
    createBookingIntoDB,
    updateBookingIntoDB,
    deleteBookingFromDB,
    getBookingFromDB,
};
