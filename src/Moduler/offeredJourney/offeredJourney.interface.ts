import { Types } from 'mongoose';

export interface TofferedJourney {
  driver: Types.ObjectId;
  bus: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  slot: string[];
}
