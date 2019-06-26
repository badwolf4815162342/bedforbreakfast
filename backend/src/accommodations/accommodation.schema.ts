import * as mongoose from 'mongoose';
import { AccommodationModel } from '../Accommodation';

export const AccommodationSchema = new mongoose.Schema<AccommodationModel>({
  name: String,
  city: String,
});
