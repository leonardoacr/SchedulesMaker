import mongoose from 'mongoose';

interface SchedulesDocument extends mongoose.Document {
  username: string;
  config: {
    backgroundImage: string;
    backgroundTheme: string;
  }[];
  schedules: {
    days: {
      day: string;
      notes: {
        time: string;
        note: string;
      }[];
    }[];
  }[];
}

const schedulesSchema = new mongoose.Schema({
  username: String,
  config: [
    {
      backgroundImage: String,
      backgroundTheme: String,
    },
  ],
  schedules: [
    {
      days: [
        {
          day: String,
          notes: [
            {
              time: String,
              note: String,
            },
          ],
        },
      ],
    },
  ],
});

const collectionName = 'Schedules';
const Schedules = mongoose.model<SchedulesDocument, mongoose.Model<SchedulesDocument>>(
  collectionName,
  schedulesSchema
);

export { Schedules };
