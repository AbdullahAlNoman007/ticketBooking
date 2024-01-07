import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import { bookingController } from './booking.controller';
import { bookingValidation } from './booking.validation';
import auth from '../../middleware/auth';
import { userRole } from '../../utility/userRole';

const router = express.Router();

router.post(
  '/create-booking',
  auth(userRole.buyer),
  validationRequest(bookingValidation.TbookingValidationSchema),
  bookingController.createBooking,
);

router.put(
  '/update-booking/:id',
  auth(userRole.buyer),
  validationRequest(bookingValidation.TbookingUpdateSchema),
  bookingController.updateBooking,
);

router.delete(
  '/delete-booking/:id',
  auth(userRole.buyer),
  bookingController.deleteBooking,
);

router.get('/get-booking', auth(userRole.admin), bookingController.getBooking);

export const bookingRouter = router;
