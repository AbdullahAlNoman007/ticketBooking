"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const zodError_1 = __importDefault(require("../Error/zodError"));
const validationError_1 = __importDefault(require("../Error/validationError"));
const CastError_1 = __importDefault(require("../Error/CastError"));
const duplicateError_1 = __importDefault(require("../Error/duplicateError"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const globalErrorHandle = (err, req, res, next) => {
    let message = err.sms || 'Error';
    let errorMessage = err.message || 'Error';
    let statusCode = 404;
    if (err instanceof zod_1.ZodError) {
        const simpleError = (0, zodError_1.default)(err);
        message = 'Zod Error';
        errorMessage = simpleError === null || simpleError === void 0 ? void 0 : simpleError.errorMessage;
        statusCode = simpleError === null || simpleError === void 0 ? void 0 : simpleError.statusCode;
    }
    else if (err.name === 'ValidationError') {
        const simpleError = (0, validationError_1.default)(err);
        message = 'Schema Validation Error';
        errorMessage = simpleError === null || simpleError === void 0 ? void 0 : simpleError.errorMessage;
        statusCode = simpleError === null || simpleError === void 0 ? void 0 : simpleError.statusCode;
    }
    else if (err.name === 'CastError') {
        const simpleError = (0, CastError_1.default)(err);
        message = 'Cast Error';
        errorMessage = simpleError === null || simpleError === void 0 ? void 0 : simpleError.errorMessage;
        statusCode = simpleError === null || simpleError === void 0 ? void 0 : simpleError.statusCode;
    }
    else if (err.code === 11000) {
        const simpleError = (0, duplicateError_1.default)(err);
        message = 'Duplicate Error';
        errorMessage = simpleError === null || simpleError === void 0 ? void 0 : simpleError.errorMessage;
        statusCode = simpleError === null || simpleError === void 0 ? void 0 : simpleError.statusCode;
    }
    else if (err instanceof AppError_1.default) {
        errorMessage = err === null || err === void 0 ? void 0 : err.message;
        statusCode = err === null || err === void 0 ? void 0 : err.statuCode;
    }
    else if (err instanceof Error) {
        errorMessage = err === null || err === void 0 ? void 0 : err.message;
    }
    if (err.statuCode === 401) {
        message = 'Unauthorized Access';
        err = null;
    }
    return res.status(404).json({
        success: false,
        message: message,
        errorMessage,
        errorDetails: err,
    });
};
exports.default = globalErrorHandle;
