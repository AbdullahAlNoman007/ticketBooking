"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offeredJourneyModel = void 0;
const mongoose_1 = require("mongoose");
const TofferedJourneySchema = new mongoose_1.Schema({
    driver: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'driver',
    },
    bus: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'bus',
    },
    date: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    slot: {
        type: [String],
        required: true,
    },
});
exports.offeredJourneyModel = (0, mongoose_1.model)('offerJourney', TofferedJourneySchema);
