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
exports.userController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utility/sendResponse"));
const trycatch_1 = __importDefault(require("../../utility/trycatch"));
const user_service_1 = require("./user.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const createBuyer = (0, trycatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, user } = req.body;
    const hashPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.salt_round));
    const result = yield user_service_1.userService.createBuyerIntoDB(hashPassword, user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Buyer created Successfully',
        data: result,
    });
}));
const createSeller = (0, trycatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, user } = req.body;
    const hashPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.salt_round));
    const result = yield user_service_1.userService.createSellerIntoDB(hashPassword, user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Seller created Successfully',
        data: result,
    });
}));
const createDriver = (0, trycatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, user } = req.body;
    const hashPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.salt_round));
    const result = yield user_service_1.userService.createDriverIntoDB(hashPassword, user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Driver created Successfully',
        data: result,
    });
}));
const createAdmin = (0, trycatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, user } = req.body;
    const hashPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.salt_round));
    const result = yield user_service_1.userService.createAdminIntoDB(hashPassword, user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Admin created Successfully',
        data: result,
    });
}));
exports.userController = {
    createBuyer,
    createSeller,
    createDriver,
    createAdmin,
};
