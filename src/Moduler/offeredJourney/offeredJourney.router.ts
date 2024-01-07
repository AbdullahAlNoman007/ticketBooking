import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import { offeredJourneyController } from './offeredJourney.controller';
import { offeredJourneyValidation } from './offeredJourney.validation';
import auth from '../../middleware/auth';
import { userRole } from '../../utility/userRole';

const router = express.Router();

router.post(
  '/create-offeredJourney',
  auth(userRole.admin),
  validationRequest(offeredJourneyValidation.TofferedJourneyValidationSchema),
  offeredJourneyController.createOfferedJourney,
);

router.get(
  '/get-offeredJourney',
  offeredJourneyController.getAllOfferedJourney,
);

router.delete(
  '/delete-offeredJourney/:id',
  auth(userRole.admin),
  offeredJourneyController.deleteOfferedJourney,
);

export const offeredJourneyRouter = router;
