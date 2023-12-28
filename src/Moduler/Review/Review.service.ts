import httpStatus from "http-status"
import { JwtPayload } from "jsonwebtoken"
import AppError from "../../Error/AppError"
import { courseModel } from "../Course/course.model"
import { Treview } from "./Review.interface"
import { reviewModel } from "./Review.model"

const createReviewIntoDB = async (payload: Treview, token: JwtPayload) => {
    const isCourseExists = await courseModel.findById(payload.courseId)
    if (!isCourseExists) {
        throw new AppError(httpStatus.BAD_REQUEST, "This course doesn't exists!")
    }
    payload.createdBy = token?._id
    const result = await (await reviewModel.create(payload)).populate({ path: 'createdBy', select: '_id username email role' })
    return result
}

export const reviewService = {
    createReviewIntoDB
}