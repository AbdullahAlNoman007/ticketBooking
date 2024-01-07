"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const statusCode = 400;
    let errorMessage = '';
    Object.entries(err.errors).forEach(([key, value]) => {
        if (value.name === 'ValidatorError') {
            errorMessage += `${value.path} is ${value.kind} | `;
        }
        else if (value.name === 'CastError') {
            const match = value === null || value === void 0 ? void 0 : value.stringValue.match(/"([^"]*)"/);
            const givenValue = match && match[1];
            errorMessage += `${value.path} is ${value.kind} but Given value is ${givenValue} | `;
        }
    });
    return {
        statusCode,
        errorMessage,
    };
};
exports.default = handleValidationError;
