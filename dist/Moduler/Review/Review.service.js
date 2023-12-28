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
exports.reviewService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const course_model_1 = require("../Course/course.model");
const Review_model_1 = require("./Review.model");
const createReviewIntoDB = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const isCourseExists = yield course_model_1.courseModel.findById(payload.courseId);
    if (!isCourseExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This course doesn't exists!");
    }
    payload.createdBy = token === null || token === void 0 ? void 0 : token._id;
    const result = yield (yield Review_model_1.reviewModel.create(payload)).populate({ path: 'createdBy', select: '_id username email role' });
    return result;
});
exports.reviewService = {
    createReviewIntoDB
};
