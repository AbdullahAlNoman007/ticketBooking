import { model, Schema } from "mongoose";
import { Treview } from "./Review.interface";

const reviewSchema = new Schema<Treview>({
    courseId: Schema.Types.ObjectId,
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    }
})

export const reviewModel = model<Treview>('review', reviewSchema)