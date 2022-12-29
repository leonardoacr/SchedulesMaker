import mongoose from 'mongoose';

interface Schedule {
  days: Array<{
    day: string;
    notes: Array<{
      time: string;
      note: string;
    }>;
  }>;
}

const schedulesSchema = new mongoose.Schema({
  username: String,
  schedules: [
    {
      days: [
        {
          day: String,
          notes: [
            {
              time: String,
              note: String
            }
          ]
        }
      ]
    }
  ]
});


const collectionName = 'Schedules';
const Schedules = mongoose.model<SchedulesDocument, SchedulesModel>(collectionName, schedulesSchema);

export { Schedules };

export interface SchedulesDocument extends mongoose.Document {
  username: string;
  schedules: Schedule[];
}

export type SchedulesModel = mongoose.Model<SchedulesDocument>;
