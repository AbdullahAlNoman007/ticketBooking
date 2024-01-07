import httpStatus from 'http-status';
import AppError from '../../Error/AppError';
import { UserModel } from '../User/user.model';
import { TchangePassword, Tlogin } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../config';
import bcrypt from 'bcrypt';
import { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../middleware/sendEmail';

const loginInDB = async (payload: Tlogin) => {
  const email: string = payload.email;
  const isUserExists = await UserModel.findOne({ email });
  if (!isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "User doesn't exists");
  }
  const jwtPayload = {
    id: isUserExists?.id,
    email: isUserExists?.email,
    role: isUserExists?.role,
  };

  const token = createToken(jwtPayload, config.token_secret as string, '10d');
  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Token');
  }

  const isPasswordMatch = await bcrypt.compare(
    payload.password,
    isUserExists?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password doesn't Match");
  }

  const user = { ...jwtPayload };

  const result = {
    user,
    token,
  };

  return result;
};

const changePasswordInDB = async (
  token: JwtPayload,
  payload: TchangePassword,
) => {
  const id: string = token?.id;
  const isUserExists = await UserModel.findOne({ id });
  if (!isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "User doesn't exists");
  }

  const isPasswordMatch = await bcrypt.compare(
    payload.oldPassword,
    isUserExists?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Old Password doesn't Match");
  }
  const hashnewPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.salt_round),
  );

  const result = await UserModel.findOneAndUpdate(
    { id },
    { password: hashnewPassword },
    { new: true, upsert: true },
  );

  const finalResult = {
    id: result.id,
    email: result.email,
    role: result.role,
  };

  return finalResult;
};

const forgetPasswordInDB = async (id: string) => {
  const isUserExists = await UserModel.findOne({ id });
  if (!isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "User doesn't exists");
  }
  if (isUserExists?.status === 'blocked') {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is Blocked');
  }
  const jwtPayload = {
    id: isUserExists.id,
    role: isUserExists.role,
    email: isUserExists.email,
  };
  const token = createToken(jwtPayload, config.token_secret as string, '10m');

  const resetLink = `${config.site_link}?id=${isUserExists.id}&token=${token}`;

  sendEmail(isUserExists.email, resetLink);

  return 'Reset link is send into your Email';
};
const resetPasswordInDB = async (
  token: string,
  payload: { id: string; newpassword: string },
) => {
  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Token is not Found');
  }
  const decoded = jwt.verify(
    token,
    config.token_secret as string,
  ) as JwtPayload;

  const { id, role, email } = decoded;
  const user = await UserModel.findOne({ id: payload.id });
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User doesn't exists");
  }
  if (user?.status === 'blocked') {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is Blocked');
  }
  if (id !== user?.id && role !== user?.role && email !== user?.email) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Token and Given Data doesn't match",
    );
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newpassword,
    Number(config.salt_round),
  );

  const result = await UserModel.findOneAndUpdate(
    { id },
    { password: newHashedPassword },
    { new: true, upsert: true },
  );

  const finalResult = {
    id: result.id,
    email: result.email,
    role: result.role,
  };

  return finalResult;
};

export const authService = {
  loginInDB,
  changePasswordInDB,
  forgetPasswordInDB,
  resetPasswordInDB,
};
