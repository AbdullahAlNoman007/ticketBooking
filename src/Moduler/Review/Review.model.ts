import { model, Schema } from "mongoose";
import { Treview } from "./Review.interface";

const reviewSchema = new Schema<Treview>({
    courseId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }

}, {
    timestamps: true
})

export const reviewModel = model<Treview>('review', reviewSchema)