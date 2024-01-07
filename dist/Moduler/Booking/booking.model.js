"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingModel = void 0;
const mongoose_1 = require("mongoose");
const TbookingSchema = new mongoose_1.Schema({
    journey: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    contactNo: { type: String, required: true },
    journeyDate: { type: String, required: true },
    startTime: { type: String, required: true },
    seatNo: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
});
exports.bookingModel = (0, mongoose_1.model)('booking', TbookingSchema);
