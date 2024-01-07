import { Schema, model } from 'mongoose';
import { Tbooking } from './booking.interface';

const TbookingSchema = new Schema<Tbooking>(
  {
    journey: { type: Schema.Types.ObjectId, required: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    contactNo: { type: String, required: true },
    journeyDate: { type: String, required: true },
    startTime: { type: String, required: true },
    seatNo: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const bookingModel = model<Tbooking>('booking', TbookingSchema);
