"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendRespone = (res, data) => {
    if (data === null || data === void 0 ? void 0 : data.meta) {
        res.status(data === null || data === void 0 ? void 0 : data.statusCode).json({
            success: data === null || data === void 0 ? void 0 : data.success,
            statusCode: data === null || data === void 0 ? void 0 : data.statusCode,
            message: data === null || data === void 0 ? void 0 : data.message,
            meta: data === null || data === void 0 ? void 0 : data.meta,
            data: data === null || data === void 0 ? void 0 : data.data,
        });
    }
    else {
        res.status(data === null || data === void 0 ? void 0 : data.statusCode).json({
            success: data === null || data === void 0 ? void 0 : data.success,
            statusCode: data === null || data === void 0 ? void 0 : data.statusCode,
            message: data === null || data === void 0 ? void 0 : data.message,
            data: data === null || data === void 0 ? void 0 : data.data,
        });
    }
};
exports.default = sendRespone;
