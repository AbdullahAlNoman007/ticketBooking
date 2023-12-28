import express from 'express'
import auth from '../../middleware/auth'
import validationRequest from '../../middleware/validationRequest'
import { userController } from './user.controller'
import { userValidation } from './user.validation'

const router = express.Router()

router.post(
    '/register',
    validationRequest(userValidation.userValidationSchema),
    userController.registerUser
)

router.post(
    '/login',
    validationRequest(userValidation.loginValidationSchema),
    userController.login
)

router.post(
    '/change-password',
    auth('admin', 'user'),
    validationRequest(userValidation.changePasswordValidationSchema),
    userController.changePassword
)


export const authRouter = router