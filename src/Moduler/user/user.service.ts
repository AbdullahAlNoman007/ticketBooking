import { TchangePassword, Tlogin, Tuser } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";
import { userModel } from "./user.model";
import AppError from "../../Error/AppError";
import httpStatus from "http-status";
import { createToken } from "./user.utils";
import { JwtPayload } from "jsonwebtoken";

const registerUserIntoDB = async (payload: Tuser) => {
    const hashPassword = await bcrypt.hash(payload.password, Number(config.salt_round));
    payload.password = hashPassword

    const result = await userModel.create(payload)

    if (!result) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user!")
    }
    const finalResult = {
        _id: result._id,
        username: result.username,
        email: result.email,
        role: result.role,
        createdAt: result?.createdAt,
        updatedAt: result?.updatedAt,
    };

    return finalResult

}

const loginIntoDB = async (payload: Tlogin) => {
    const isUserExists = await userModel.findOne({ username: payload.username })
    if (!isUserExists) {
        throw new AppError(httpStatus.BAD_REQUEST, "User doesn't exists!")
    }
    const jwtpayload = {
        _id: (isUserExists?._id).toString(),
        email: isUserExists?.email,
        role: isUserExists?.role,
    }
    const username = isUserExists?.username

    const token = createToken(jwtpayload, config.token_secret as string, '10d')

    if (!token) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create access token")
    }

    const isPasswordMatch = await bcrypt.compare(payload.password, isUserExists?.password)

    if (!isPasswordMatch) {
        throw new AppError(httpStatus.BAD_REQUEST, "Password doesn't match")
    }

    const user = { ...jwtpayload, username }
    const result = {
        user,
        token
    }
    return result
}

const changePasswordInDB = async (token: JwtPayload, payload: TchangePassword) => {

    const user = await userModel.findById(token._id)

    if (payload?.currentPassword === payload?.newPassword) {
        throw new AppError(httpStatus.BAD_REQUEST, "New password & old Password is same!")
    }

    const isPasswordMatch = await bcrypt.compare(payload?.currentPassword, user?.password as string)

    if (!isPasswordMatch) {
        throw new AppError(httpStatus.BAD_REQUEST, "Password doesn't match")
    }
    const hashNewPassword = await bcrypt.hash(payload?.newPassword, Number(config.salt_round));

    let passwordHistory = user?.passwordHistory

    for (const pass of passwordHistory || []) {
        if (await bcrypt.compare(payload?.newPassword, pass?.password as string)) {
            throw new AppError(httpStatus.BAD_REQUEST, "New password matches a previous password");
        }
    }

    const lastPassword = user?.password as string

    passwordHistory?.push({ password: lastPassword })
    passwordHistory = passwordHistory?.slice(-2)

    const result = await userModel.findByIdAndUpdate(token._id, {
        password: hashNewPassword,
        passwordHistory
    }, { new: true, upsert: true })

    const finalResult = {
        _id: result._id,
        username: result.username,
        email: result.email,
        role: result.role,
        createdAt: result?.createdAt,
        updatedAt: result?.updatedAt,
    };

    return finalResult



}

export const userService = {
    registerUserIntoDB,
    loginIntoDB,
    changePasswordInDB
}