import { Treview } from "./Review.interface"
import { reviewModel } from "./Review.model"

const createReviewIntoDB = async (payload: Treview) => {
    const result = await reviewModel.create(payload)
    return result
}

export const reviewService = {
    createReviewIntoDB
}