import httpStatus from "http-status";
import sendRespone from "../../utility/sendResponse";
import catchAsync from "../../utility/trycatch";
import { categoryService } from "./Category,service";

const createCategory = catchAsync(async (req, res) => {
    const payload = req.body
    const result = await categoryService.createCategoryIntoDB(payload)
    sendRespone(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Category created successfully",
        data: result
    })
})

const getCategory = catchAsync(async (req, res) => {
    const result = await categoryService.getCategoryFromDB()
    sendRespone(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Categories retrieved successfully",
        data: result
    })
})

export const categoryController = {
    createCategory,
    getCategory
}