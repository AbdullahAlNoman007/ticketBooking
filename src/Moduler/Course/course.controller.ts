import httpStatus from "http-status";
import sendRespone from "../../utility/sendResponse";
import catchAsync from "../../utility/trycatch";
import { TCourse } from "./course.interface";
import { courseService } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
    const payload: TCourse = req.body;
    const result = await courseService.createCourseIntoDB(payload, req.user)
    sendRespone(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Course created successfully",
        data: result
    })
})
const getCourse = catchAsync(async (req, res) => {
    const query = req.query
    const result = await courseService.getCourseFromDB(query)
    sendRespone(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Courses retrieved successfully',
        meta: {
            ...query,
            total: result.length
        },
        data: result
    })
})
const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body

    const result = await courseService.updateCourseIntoDB(id, payload)
    sendRespone(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course updated successfully',
        data: result
    })
})
const getCourseReview = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await courseService.getCourseReviewFromDB(id)
    sendRespone(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course and Reviews retrieved successfully',
        data: result
    })
})
const bestCourse = catchAsync(async (req, res) => {
    const result = await courseService.bestCourseInDB()
    sendRespone(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Best course retrieved successfully',
        data: result
    })
})
export const courseController = {
    createCourse,
    getCourse,
    updateCourse,
    getCourseReview,
    bestCourse
}