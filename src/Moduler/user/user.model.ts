import { model, Schema } from "mongoose";
import { TpasswordHistory, Tuser } from "./user.interface";

const TpasswordHistorySchema = new Schema<TpasswordHistory>({
    password: {
        type: String,
    }
}, {
    timestamps: true
})

const TuserSchema = new Schema<Tuser>({
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
})

export const userModel = model<Tuser>('user', TuserSchema)