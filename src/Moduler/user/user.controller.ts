import httpStatus from 'http-status';
import sendRespone from '../../utility/sendResponse';
import catchAsync from '../../utility/trycatch';
import { userService } from './user.service';
import bcrypt from 'bcrypt';
import config from '../../config';

const createBuyer = catchAsync(async (req, res) => {
  const { password, user } = req.body;
  const hashPassword = await bcrypt.hash(password, Number(config.salt_round));
  const result = await userService.createBuyerIntoDB(hashPassword, user);
  sendRespone(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Buyer created Successfully',
    data: result,
  });
});
const createSeller = catchAsync(async (req, res) => {
  const { password, user } = req.body;
  const hashPassword = await bcrypt.hash(password, Number(config.salt_round));
  const result = await userService.createSellerIntoDB(hashPassword, user);
  sendRespone(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Seller created Successfully',
    data: result,
  });
});
const createDriver = catchAsync(async (req, res) => {
  const { password, user } = req.body;
  const hashPassword = await bcrypt.hash(password, Number(config.salt_round));
  const result = await userService.createDriverIntoDB(hashPassword, user);
  sendRespone(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Driver created Successfully',
    data: result,
  });
});
const createAdmin = catchAsync(async (req, res) => {
  const { password, user } = req.body;
  const hashPassword = await bcrypt.hash(password, Number(config.salt_round));
  const result = await userService.createAdminIntoDB(hashPassword, user);
  sendRespone(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Admin created Successfully',
    data: result,
  });
});

export const userController = {
  createBuyer,
  createSeller,
  createDriver,
  createAdmin,
};
