"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const busSchema = new mongoose_1.Schema({
    companyName: { type: String, required: true },
    no: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true },
    slot: { type: [String], required: true },
});
const busModel = (0, mongoose_1.model)('bus', busSchema);
exports.default = busModel;
