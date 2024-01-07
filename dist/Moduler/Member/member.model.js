"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminModel = exports.driverModel = exports.sellerModel = exports.buyerModel = void 0;
const mongoose_1 = require("mongoose");
const memberSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
});
exports.buyerModel = (0, mongoose_1.model)('buyer', memberSchema);
exports.sellerModel = (0, mongoose_1.model)('seller', memberSchema);
exports.driverModel = (0, mongoose_1.model)('driver', memberSchema);
exports.adminModel = (0, mongoose_1.model)('admin', memberSchema);
