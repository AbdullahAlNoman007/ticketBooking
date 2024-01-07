import { Schema, model } from 'mongoose';
import { Tbus } from './bus.interface';

const busSchema = new Schema<Tbus>({
  companyName: { type: String, required: true },
  no: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  slot: { type: [String], required: true },
});

const busModel = model<Tbus>('bus', busSchema);

export default busModel;
