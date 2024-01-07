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
exports.offeredJourneyService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const member_model_1 = require("../Member/member.model");
const bus_model_1 = __importDefault(require("../Bus/bus.model"));
const offeredJourney_mode_1 = require("./offeredJourney.mode");
const createOfferedJourneyIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { driver, bus, date } = payload;
    const isDriverExists = yield member_model_1.driverModel.findById(driver);
    if (!isDriverExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Driver is not found');
    }
    const isBusExists = yield bus_model_1.default.findById(bus);
    if (!isBusExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Bus is not found');
    }
    payload.capacity = isBusExists.capacity;
    payload.slot = isBusExists.slot;
    const isBusAndDateConflict = yield offeredJourney_mode_1.offeredJourneyModel.findOne({ bus, date });
    if (isBusAndDateConflict) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'This Bus has trip on this date');
    }
    const isDriverAndDateConflict = yield offeredJourney_mode_1.offeredJourneyModel.findOne({
        driver,
        date,
    });
    if (isDriverAndDateConflict) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'This Driver has trip on this date');
    }
    const result = yield offeredJourney_mode_1.offeredJourneyModel.create(payload);
    return result;
});
const getAllOfferedJourneyFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = Object.assign({}, query);
    const queryBuilder = yield offeredJourney_mode_1.offeredJourneyModel
        .find(queryObj)
        .populate({ path: 'driver', select: 'id name email contactNo -_id' })
        .populate({ path: 'bus', select: 'companyName no capacity -_id' });
    return queryBuilder;
});
const deleteOfferedJourneyFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offeredJourney_mode_1.offeredJourneyModel.findByIdAndDelete(id);
    return result;
});
exports.offeredJourneyService = {
    createOfferedJourneyIntoDB,
    getAllOfferedJourneyFromDB,
    deleteOfferedJourneyFromDB,
};
