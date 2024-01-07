import httpStatus from 'http-status';
import sendRespone from '../../utility/sendResponse';
import catchAsync from '../../utility/trycatch';
import { busService } from './bus.service';

const createBus = catchAsync(async (req, res) => {
  const result = await busService.createBusIntoDB(req.body);

  sendRespone(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Bus created Successfully',
    data: result,
  });
});
const getAllBus = catchAsync(async (req, res) => {
  const result = await busService.getAllBus();

  sendRespone(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Bus is Retrieved Successfully',
    data: result,
  });
});
const getBus = catchAsync(async (req, res) => {
  const result = await busService.getBus(req.params.id);

  sendRespone(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bus is Retrieved Successfully',
    data: result,
  });
});
const deleteBus = catchAsync(async (req, res) => {
  const result = await busService.deleteBus(req.params.id);

  sendRespone(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bus is Deleted Successfully',
    data: result,
  });
});

export const busController = {
  createBus,
  getAllBus,
  getBus,
  deleteBus,
};
