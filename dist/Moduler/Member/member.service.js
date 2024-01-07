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
exports.memberService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const member_model_1 = require("./member.model");
const getAllBuyerFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_model_1.buyerModel.find({});
    return result;
});
const getABuyerFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_model_1.buyerModel.findOne({ id });
    return result;
});
const getAllSellerFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_model_1.sellerModel.find({});
    return result;
});
const getASellerFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_model_1.sellerModel.findOne({ id });
    return result;
});
const getAllDriverFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_model_1.driverModel.find({});
    return result;
});
const getADriverFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_model_1.driverModel.findOne({ id });
    return result;
});
const getAllAdminFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_model_1.adminModel.find({});
    return result;
});
const getAAdminFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_model_1.adminModel.findOne({ id });
    return result;
});
const updateBuyerIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield member_model_1.buyerModel.findOne({ id });
    if (!isExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Buyer doesn't Exists!");
    }
    const result = yield member_model_1.buyerModel.findOneAndUpdate({ id }, payload);
    return result;
});
const updateSellerIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield member_model_1.sellerModel.findOne({ id });
    if (!isExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Seller doesn't Exists!");
    }
    const result = yield member_model_1.sellerModel.findOneAndUpdate({ id }, payload);
    return result;
});
const updateDriverIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield member_model_1.driverModel.findOne({ id });
    if (!isExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Driver doesn't Exists!");
    }
    const result = yield member_model_1.driverModel.findOneAndUpdate({ id }, payload);
    return result;
});
const updateAdminIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield member_model_1.adminModel.findOne({ id });
    if (!isExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Admin doesn't Exists!");
    }
    const result = yield member_model_1.adminModel.findOneAndUpdate({ id }, payload);
    return result;
});
const deleteBuyerInDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield member_model_1.buyerModel.findOne({ id });
    if (!isExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Buyer doesn't Exists!");
    }
    const result = yield member_model_1.buyerModel.findOneAndDelete({ id });
    return result;
});
const deleteSellerInDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield member_model_1.sellerModel.findOne({ id });
    if (!isExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Seller doesn't Exists!");
    }
    const result = yield member_model_1.sellerModel.findOneAndDelete({ id });
    return result;
});
const deleteDriverInDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield member_model_1.driverModel.findOne({ id });
    if (!isExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Driver doesn't Exists!");
    }
    const result = yield member_model_1.driverModel.findOneAndDelete({ id });
    return result;
});
const deleteAdminInDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield member_model_1.adminModel.findOne({ id });
    if (!isExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Admin doesn't Exists!");
    }
    const result = yield member_model_1.adminModel.findOneAndDelete({ id });
    return result;
});
exports.memberService = {
    getABuyerFromDB,
    getADriverFromDB,
    getASellerFromDB,
    getAllBuyerFromDB,
    getAllDriverFromDB,
    getAllSellerFromDB,
    updateBuyerIntoDB,
    updateSellerIntoDB,
    updateDriverIntoDB,
    deleteBuyerInDB,
    deleteSellerInDB,
    deleteDriverInDB,
    getAAdminFromDB,
    getAllAdminFromDB,
    updateAdminIntoDB,
    deleteAdminInDB,
};
