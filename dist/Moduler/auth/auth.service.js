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
exports.authService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const user_model_1 = require("../User/user.model");
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendEmail_1 = require("../../middleware/sendEmail");
const loginInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const email = payload.email;
    const isUserExists = yield user_model_1.UserModel.findOne({ email });
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User doesn't exists");
    }
    const jwtPayload = {
        id: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.id,
        email: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.email,
        role: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.role,
    };
    const token = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.token_secret, '10d');
    if (!token) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create Token');
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(payload.password, isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Password doesn't Match");
    }
    const user = Object.assign({}, jwtPayload);
    const result = {
        user,
        token,
    };
    return result;
});
const changePasswordInDB = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const id = token === null || token === void 0 ? void 0 : token.id;
    const isUserExists = yield user_model_1.UserModel.findOne({ id });
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User doesn't exists");
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(payload.oldPassword, isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Old Password doesn't Match");
    }
    const hashnewPassword = yield bcrypt_1.default.hash(payload === null || payload === void 0 ? void 0 : payload.newPassword, Number(config_1.default.salt_round));
    const result = yield user_model_1.UserModel.findOneAndUpdate({ id }, { password: hashnewPassword }, { new: true, upsert: true });
    const finalResult = {
        id: result.id,
        email: result.email,
        role: result.role,
    };
    return finalResult;
});
const forgetPasswordInDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.UserModel.findOne({ id });
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User doesn't exists");
    }
    if ((isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.status) === 'blocked') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User is Blocked');
    }
    const jwtPayload = {
        id: isUserExists.id,
        role: isUserExists.role,
        email: isUserExists.email,
    };
    const token = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.token_secret, '10m');
    const resetLink = `${config_1.default.site_link}?id=${isUserExists.id}&token=${token}`;
    (0, sendEmail_1.sendEmail)(isUserExists.email, resetLink);
    return 'Reset link is send into your Email';
});
const resetPasswordInDB = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Token is not Found');
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.token_secret);
    const { id, role, email } = decoded;
    const user = yield user_model_1.UserModel.findOne({ id: payload.id });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User doesn't exists");
    }
    if ((user === null || user === void 0 ? void 0 : user.status) === 'blocked') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User is Blocked');
    }
    if (id !== (user === null || user === void 0 ? void 0 : user.id) && role !== (user === null || user === void 0 ? void 0 : user.role) && email !== (user === null || user === void 0 ? void 0 : user.email)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Token and Given Data doesn't match");
    }
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newpassword, Number(config_1.default.salt_round));
    const result = yield user_model_1.UserModel.findOneAndUpdate({ id }, { password: newHashedPassword }, { new: true, upsert: true });
    const finalResult = {
        id: result.id,
        email: result.email,
        role: result.role,
    };
    return finalResult;
});
exports.authService = {
    loginInDB,
    changePasswordInDB,
    forgetPasswordInDB,
    resetPasswordInDB,
};
