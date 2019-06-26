import { Accommodation } from '@bed-for-breakfast/shared/dist/interfaces/Accommodation';
import * as mongoose from 'mongoose';

export interface AccommodationModel extends Accommodation, mongoose.Document {}
