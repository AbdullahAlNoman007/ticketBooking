import httpStatus from 'http-status';
import AppError from '../../Error/AppError';
import { Tmember } from './member.interface';
import {
  adminModel,
  buyerModel,
  driverModel,
  sellerModel,
} from './member.model';

const getAllBuyerFromDB = async () => {
  const result = await buyerModel.find({});
  return result;
};
const getABuyerFromDB = async (id: string) => {
  const result = await buyerModel.findOne({ id });
  return result;
};
const getAllSellerFromDB = async () => {
  const result = await sellerModel.find({});
  return result;
};
const getASellerFromDB = async (id: string) => {
  const result = await sellerModel.findOne({ id });
  return result;
};
const getAllDriverFromDB = async () => {
  const result = await driverModel.find({});
  return result;
};
const getADriverFromDB = async (id: string) => {
  const result = await driverModel.findOne({ id });
  return result;
};
const getAllAdminFromDB = async () => {
  const result = await adminModel.find({});
  return result;
};
const getAAdminFromDB = async (id: string) => {
  const result = await adminModel.findOne({ id });
  return result;
};

const updateBuyerIntoDB = async (id: string, payload: Partial<Tmember>) => {
  const isExists = await buyerModel.findOne({ id });
  if (!isExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Buyer doesn't Exists!");
  }
  const result = await buyerModel.findOneAndUpdate({ id }, payload);
  return result;
};
const updateSellerIntoDB = async (id: string, payload: Partial<Tmember>) => {
  const isExists = await sellerModel.findOne({ id });
  if (!isExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Seller doesn't Exists!");
  }
  const result = await sellerModel.findOneAndUpdate({ id }, payload);
  return result;
};
const updateDriverIntoDB = async (id: string, payload: Partial<Tmember>) => {
  const isExists = await driverModel.findOne({ id });
  if (!isExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Driver doesn't Exists!");
  }
  const result = await driverModel.findOneAndUpdate({ id }, payload);
  return result;
};
const updateAdminIntoDB = async (id: string, payload: Partial<Tmember>) => {
  const isExists = await adminModel.findOne({ id });
  if (!isExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Admin doesn't Exists!");
  }
  const result = await adminModel.findOneAndUpdate({ id }, payload);
  return result;
};

const deleteBuyerInDB = async (id: string) => {
  const isExists = await buyerModel.findOne({ id });
  if (!isExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Buyer doesn't Exists!");
  }
  const result = await buyerModel.findOneAndDelete({ id });
  return result;
};
const deleteSellerInDB = async (id: string) => {
  const isExists = await sellerModel.findOne({ id });
  if (!isExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Seller doesn't Exists!");
  }
  const result = await sellerModel.findOneAndDelete({ id });
  return result;
};
const deleteDriverInDB = async (id: string) => {
  const isExists = await driverModel.findOne({ id });
  if (!isExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Driver doesn't Exists!");
  }
  const result = await driverModel.findOneAndDelete({ id });
  return result;
};
const deleteAdminInDB = async (id: string) => {
  const isExists = await adminModel.findOne({ id });
  if (!isExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Admin doesn't Exists!");
  }
  const result = await adminModel.findOneAndDelete({ id });
  return result;
};

export const memberService = {
  getABuyerFromDB,
  getADriverFromDB,
  getASellerFromDB,
  getAllBuyerFromDB,
  getAllDriverFromDB,
  getAllSellerFromDB,
  updateBuyerIntoDB,
  updateSellerIntoDB,
  updateDriverIntoDB,
  deleteBuyerInDB,
  deleteSellerInDB,
  deleteDriverInDB,
  getAAdminFromDB,
  getAllAdminFromDB,
  updateAdminIntoDB,
  deleteAdminInDB,
};
