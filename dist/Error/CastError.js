"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const statusCode = 400;
    let errorMessage = err.message;
    return {
        statusCode,
        errorMessage
    };
};
exports.default = handleCastError;
