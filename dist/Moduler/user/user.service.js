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
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("./user.model");
const AppError_1 = __importDefault(require("../../Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const user_utils_1 = require("./user.utils");
const registerUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.salt_round));
    payload.password = hashPassword;
    const result = yield user_model_1.userModel.create(payload);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create user!");
    }
    const finalResult = {
        _id: result._id,
        username: result.username,
        email: result.email,
        role: result.role,
        createdAt: result === null || result === void 0 ? void 0 : result.createdAt,
        updatedAt: result === null || result === void 0 ? void 0 : result.updatedAt,
    };
    return finalResult;
});
const loginIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.userModel.findOne({ username: payload.username });
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User doesn't exists!");
    }
    const jwtpayload = {
        _id: (isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists._id).toString(),
        email: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.email,
        role: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.role,
    };
    const username = isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.username;
    const token = (0, user_utils_1.createToken)(jwtpayload, config_1.default.token_secret, '10d');
    if (!token) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create access token");
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(payload.password, isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Password doesn't match");
    }
    const user = Object.assign(Object.assign({}, jwtpayload), { username });
    const result = {
        user,
        token
    };
    return result;
});
const changePasswordInDB = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.findById(token._id);
    if ((payload === null || payload === void 0 ? void 0 : payload.currentPassword) === (payload === null || payload === void 0 ? void 0 : payload.newPassword)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "New password & old Password is same!");
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.currentPassword, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Password doesn't match");
    }
    const hashNewPassword = yield bcrypt_1.default.hash(payload === null || payload === void 0 ? void 0 : payload.newPassword, Number(config_1.default.salt_round));
    let passwordHistory = user === null || user === void 0 ? void 0 : user.passwordHistory;
    for (const pass of passwordHistory || []) {
        if (yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.newPassword, pass === null || pass === void 0 ? void 0 : pass.password)) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "New password matches a previous password");
        }
    }
    const lastPassword = user === null || user === void 0 ? void 0 : user.password;
    passwordHistory === null || passwordHistory === void 0 ? void 0 : passwordHistory.push({ password: lastPassword });
    passwordHistory = passwordHistory === null || passwordHistory === void 0 ? void 0 : passwordHistory.slice(-2);
    const result = yield user_model_1.userModel.findByIdAndUpdate(token._id, {
        password: hashNewPassword,
        passwordHistory
    }, { new: true, upsert: true });
    const finalResult = {
        _id: result._id,
        username: result.username,
        email: result.email,
        role: result.role,
        createdAt: result === null || result === void 0 ? void 0 : result.createdAt,
        updatedAt: result === null || result === void 0 ? void 0 : result.updatedAt,
    };
    return finalResult;
});
exports.userService = {
    registerUserIntoDB,
    loginIntoDB,
    changePasswordInDB
};
