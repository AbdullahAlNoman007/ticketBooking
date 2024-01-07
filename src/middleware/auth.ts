import httpStatus from 'http-status';
import AppError from '../Error/AppError';
import catchAsync from '../utility/trycatch';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { UserModel } from '../Moduler/User/user.model';

const auth = (
  ...requiredRoles: ('admin' | 'seller' | 'buyer' | 'driver')[]
) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You do not have the necessary permissions to access this resource.',
      );
    }
    const decoded = jwt.verify(
      token,
      config.token_secret as string,
    ) as JwtPayload;

    const { role, id } = decoded;

    const isUserExists = await UserModel.findOne({ id });
    if (!isUserExists) {
      throw new AppError(httpStatus.BAD_REQUEST, "User doesn't exists!");
    }
    if (isUserExists?.status === 'blocked') {
      throw new AppError(httpStatus.BAD_REQUEST, 'User is Blocked');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You do not have the necessary permissions to access this resource.You are not authorized!',
      );
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
