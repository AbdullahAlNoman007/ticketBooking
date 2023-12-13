import httpStatus from "http-status";
import sendRespone from "../../utility/sendResponse";
import catchAsync from "../../utility/trycatch";
import { Treview } from "./Review.interface";
import { reviewService } from "./Review.service";

const createReview = catchAsync(async (req, res) => {
    const payload: Treview = req.body;
    const result = await reviewService.createReviewIntoDB(payload)
    sendRespone(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Review created successfully",
        data: result
    })
})
export const reviewController = {
    createReview
}
