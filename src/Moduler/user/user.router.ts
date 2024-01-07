import express from 'express';
import { userController } from './user.controller';
import validationRequest from '../../middleware/validationRequest';
import { MemberValidationSchema } from './user.validation';
import auth from '../../middleware/auth';
import { userRole } from '../../utility/userRole';

const router = express.Router();

router.post(
  '/create-buyer',
  validationRequest(MemberValidationSchema),
  userController.createBuyer,
);
router.post(
  '/create-seller',
  auth(userRole.admin),
  validationRequest(MemberValidationSchema),
  userController.createSeller,
);
router.post(
  '/create-driver',
  auth(userRole.admin),
  validationRequest(MemberValidationSchema),
  userController.createDriver,
);
router.post(
  '/create-admin',
  auth(userRole.admin),
  validationRequest(MemberValidationSchema),
  userController.createAdmin,
);

export const userRouter = router;
