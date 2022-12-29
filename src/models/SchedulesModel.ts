import mongoose, { Schema } from 'mongoose';

interface Schedule {
  day: string;
  notes: Array<{
    time: string;
    note: string;
  }>;
}

const scheduleSchema: Schema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  notes: [
    {
      time: {
        type: String,
        required: true,
      },
      note: {
        type: String,
        required: true,
      },
    },
  ],
});

const schedulesSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  schedules: {
    type: [scheduleSchema],
    required: true,
  },
});

const collectionName = 'Schedules';
const Schedules = mongoose.model<SchedulesDocument, SchedulesModel>(collectionName, schedulesSchema);

export { Schedules };

export interface SchedulesDocument extends mongoose.Document {
  username: string;
  schedules: Schedule[];
}

export type SchedulesModel = mongoose.Model<SchedulesDocument>;
