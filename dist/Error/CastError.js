"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const statusCode = 400;
    const errorMessage = err.message;
    return {
        statusCode,
        errorMessage,
    };
};
exports.default = handleCastError;
