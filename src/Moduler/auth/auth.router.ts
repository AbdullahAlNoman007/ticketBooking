import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';
import auth from '../../middleware/auth';
import { userRole } from '../../utility/userRole';

const router = express.Router();

router.post(
  '/login',
  validationRequest(authValidation.logInvalidationSchema),
  authController.login,
);
router.post(
  '/change-password',
  auth(userRole.admin, userRole.buyer, userRole.driver, userRole.seller),
  validationRequest(authValidation.changePasswordValidationSchema),
  authController.changePassword,
);

router.post(
  '/forget-password',
  validationRequest(authValidation.forgetpasswordValidationSchema),
  authController.forgetPassword,
);

router.post(
  '/reset-password',
  validationRequest(authValidation.resetpasswordValidationSchema),
  authController.resetPassword,
);

export const authRouter = router;
