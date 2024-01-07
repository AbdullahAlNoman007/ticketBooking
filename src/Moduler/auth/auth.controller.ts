import httpStatus from 'http-status';
import sendRespone from '../../utility/sendResponse';
import catchAsync from '../../utility/trycatch';
import { authService } from './auth.service';

const login = catchAsync(async (req, res) => {
  const result = await authService.loginInDB(req.body);
  sendRespone(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Login Successful',
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const result = await authService.changePasswordInDB(req.user, req.body);
  sendRespone(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password changed Successful',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const result = await authService.forgetPasswordInDB(req.body.id);
  sendRespone(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reset Link send Successfully',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization as string;
  const payload = req.body;

  const result = await authService.resetPasswordInDB(token, payload);
  sendRespone(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password changed Successful',
    data: result,
  });
});

export const authController = {
  login,
  changePassword,
  forgetPassword,
  resetPassword,
};
