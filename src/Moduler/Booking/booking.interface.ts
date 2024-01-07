import { Types } from 'mongoose';

export interface Tbooking {
  journey: Types.ObjectId;
  userId: string;
  userName: string;
  userEmail: string;
  contactNo: string;
  journeyDate: string;
  startTime: string;
  seatNo: string[];
}
