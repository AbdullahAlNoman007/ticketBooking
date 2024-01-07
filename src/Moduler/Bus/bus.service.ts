import { Tbus } from './bus.interface';
import busModel from './bus.model';

const createBusIntoDB = async (payload: Tbus) => {
  const result = await busModel.create(payload);
  return result;
};

const getAllBus = async () => {
  const result = await busModel.find({});
  return result;
};

const getBus = async (id: string) => {
  const result = await busModel.findById(id);
  return result;
};

const deleteBus = async (id: string) => {
  const result = await busModel.findByIdAndDelete(id);
  return result;
};

export const busService = {
  createBusIntoDB,
  getAllBus,
  getBus,
  deleteBus,
};
