"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    let errorMessage = '';
    err.issues.map((issue) => {
        errorMessage += `${issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1]}, ${issue === null || issue === void 0 ? void 0 : issue.message} | `;
    });
    const statusCode = 400;
    return {
        statusCode,
        errorMessage,
    };
};
exports.default = handleZodError;
