import mongoose from 'mongoose';
import { Tmember } from '../Member/member.interface';
import { Tuser } from './user.interface';
import generateId from './user.utils';
import { UserModel } from './user.model';
import AppError from '../../Error/AppError';
import httpStatus from 'http-status';
import {
  adminModel,
  buyerModel,
  driverModel,
  sellerModel,
} from '../Member/member.model';

const createBuyerIntoDB = async (password: string, payload: Tmember) => {
  const user: Partial<Tuser> = {};
  user.password = password;
  user.email = payload.email;
  user.role = 'buyer';

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    user.id = (await generateId('buyer')) as string;

    const newUser = await UserModel.create([user], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newBuyer = await buyerModel.create([payload], { session });
    if (!newBuyer.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Buyer');
    }

    await session.commitTransaction();
    await session.endSession();
    return newBuyer;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};
const createSellerIntoDB = async (password: string, payload: Tmember) => {
  const user: Partial<Tuser> = {};
  user.password = password;
  user.email = payload.email;
  user.role = 'seller';

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    user.id = (await generateId('seller')) as string;

    const newUser = await UserModel.create([user], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newSeller = await sellerModel.create([payload], { session });
    if (!newSeller.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Seller');
    }

    await session.commitTransaction();
    await session.endSession();
    return newSeller;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};
const createDriverIntoDB = async (password: string, payload: Tmember) => {
  const user: Partial<Tuser> = {};
  user.password = password;
  user.email = payload.email;
  user.role = 'driver';

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    user.id = (await generateId('driver')) as string;

    const newUser = await UserModel.create([user], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newDriver = await driverModel.create([payload], { session });
    if (!newDriver.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Driver');
    }

    await session.commitTransaction();
    await session.endSession();
    return newDriver;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};
const createAdminIntoDB = async (password: string, payload: Tmember) => {
  const user: Partial<Tuser> = {};
  user.password = password;
  user.email = payload.email;
  user.role = 'admin';

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    user.id = (await generateId('admin')) as string;

    const newUser = await UserModel.create([user], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newAdmin = await adminModel.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Admin');
    }

    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const userService = {
  createBuyerIntoDB,
  createDriverIntoDB,
  createSellerIntoDB,
  createAdminIntoDB,
};
