"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const statusCode = 400;
    const match = err.message.match(/"([^"]*)"/);
    const message = match && match[1];
    const errorMessage = `${message} already exists` || ' ';
    return {
        statusCode,
        errorMessage,
    };
};
exports.default = handleDuplicateError;
