import express from 'express';
import { userRouter } from '../Moduler/User/user.router';
import { memberRouter } from '../Moduler/Member/member.router';
import { authRouter } from '../Moduler/auth/auth.router';
import { busRouter } from '../Moduler/Bus/bus.router';
import { offeredJourneyRouter } from '../Moduler/offeredJourney/offeredJourney.router';
import { bookingRouter } from '../Moduler/Booking/booking.router';

const router = express.Router();
const moduleRouters = [
  {
    path: '/user',
    router: userRouter,
  },
  {
    path: '/user',
    router: memberRouter,
  },
  {
    path: '/auth',
    router: authRouter,
  },
  {
    path: '/bus',
    router: busRouter,
  },
  {
    path: '/offeredJourney',
    router: offeredJourneyRouter,
  },
  {
    path: '/booking',
    router: bookingRouter,
  },
];
moduleRouters.map((route) => router.use(route.path, route.router));

export default router;
