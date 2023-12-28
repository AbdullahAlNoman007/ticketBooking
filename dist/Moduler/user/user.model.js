"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const TpasswordHistorySchema = new mongoose_1.Schema({
    password: {
        type: String,
    }
}, {
    timestamps: true
});
const TuserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: [6, "Password must be equal or greater than 6 characters"],
        max: [32, "Password must be equal or less than 32 characters"],
    },
    passwordHistory: [TpasswordHistorySchema],
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true,
    }
}, {
    timestamps: true
});
exports.userModel = (0, mongoose_1.model)('user', TuserSchema);
