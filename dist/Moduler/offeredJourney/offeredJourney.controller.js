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
exports.offeredJourneyController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utility/sendResponse"));
const trycatch_1 = __importDefault(require("../../utility/trycatch"));
const offeredJourney_service_1 = require("./offeredJourney.service");
const createOfferedJourney = (0, trycatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offeredJourney_service_1.offeredJourneyService.createOfferedJourneyIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Offered Journey is created Successfully!',
        data: result,
    });
}));
const getAllOfferedJourney = (0, trycatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield offeredJourney_service_1.offeredJourneyService.getAllOfferedJourneyFromDB(query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Offered Journey is retrieved Successfully!',
        meta: Object.assign(Object.assign({}, query), { total: result.length }),
        data: result,
    });
}));
const deleteOfferedJourney = (0, trycatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offeredJourney_service_1.offeredJourneyService.deleteOfferedJourneyFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Offered Journey is deleted Successfully!',
        data: result,
    });
}));
exports.offeredJourneyController = {
    createOfferedJourney,
    getAllOfferedJourney,
    deleteOfferedJourney,
};
