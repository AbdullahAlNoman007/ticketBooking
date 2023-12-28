import httpStatus from "http-status";
import sendRespone from "../../utility/sendResponse";
import catchAsync from "../../utility/trycatch";
import { userService } from "./user.service";

const registerUser = catchAsync(async (req, res) => {

    const result = await userService.registerUserIntoDB(req.body)

    sendRespone(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User registered successfully',
        data: result
    })
})

const login = catchAsync(async (req, res) => {

    const result = await userService.loginIntoDB(req.body)

    sendRespone(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User login successful',
        data: result
    })
})
const changePassword = catchAsync(async (req, res) => {

    const result = await userService.changePasswordInDB(req.user, req.body)

    sendRespone(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password changed successfully',
        data: result
    })
})

export const userController = {
    registerUser,
    login,
    changePassword
}