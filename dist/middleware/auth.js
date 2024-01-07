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
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const trycatch_1 = __importDefault(require("../utility/trycatch"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../Moduler/User/user.model");
const auth = (...requiredRoles) => {
    return (0, trycatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You do not have the necessary permissions to access this resource.');
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.token_secret);
        const { role, id } = decoded;
        const isUserExists = yield user_model_1.UserModel.findOne({ id });
        if (!isUserExists) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User doesn't exists!");
        }
        if ((isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.status) === 'blocked') {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User is Blocked');
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You do not have the necessary permissions to access this resource.You are not authorized!');
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
