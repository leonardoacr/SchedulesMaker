import { Schedules } from '../models/SchedulesModel';

export const createScheduleInDB = async (
  username: string,
  day: string,
  time: string,
  note: string
): Promise<void> => {
  const newSchedule = {
    username,
    config: [
      {
        backgroundImage: '',
        backgroundTheme: ''
      }
    ],
    schedules: [
      {
        days: [
          {
            day,
            notes: [
              {
                time,
                note
              }
            ]
          }
        ]
      }
    ]
  };

  const mongooseSchedule = new Schedules(newSchedule);

  try {
    await mongooseSchedule.save();
    //console.log('New schedule created successfully!');
  } catch (error) {
    //console.log('Error while saving createSchedule: ' + error);
  }
};
