import jwt from 'jsonwebtoken';
import { TjwtPayLoad } from './auth.interface';

export const createToken = (
  jwtPayLoad: TjwtPayLoad,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayLoad, secret, { expiresIn });
};
