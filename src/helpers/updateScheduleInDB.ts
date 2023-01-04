import { Schedules } from '../models/SchedulesModel';
import { createScheduleInDB } from './createScheduleInDB';

export const updateScheduleInDB = async (
  username: string,
  day: string,
  time: string,
  note: string
): Promise<void> => {
  const user = await Schedules.findOne({ username });

  if (user) {
    // Check if the day already exists in the schedules array
    const dayExists = user.schedules.some((schedule) =>
      schedule.days.some((d) => d.day === day)
    );
    // Check if time already exists in the notes array
    const timeExists = user.schedules.some((schedule) => {
      const foundDay = schedule.days.find((d) => d.day === day);
      if (!foundDay) {
        return false;
      }
      return foundDay.notes.some((note) => note.time === time);
    });

    console.log('dayExists: ' + dayExists);
    if (dayExists) {
      if (!timeExists) {
        // If the day exists and time does not, update the schedule for the given day by adding a new note to the notes array
        const update = {
          $push: { 'schedules.$[s].days.$[d].notes': { time, note } }
        };
        const options = {
          arrayFilters: [{ 's.days.day': day }, { 'd.day': day }]
        };
        try {
          await Schedules.findOneAndUpdate({ username }, update, options);
          console.log(
            'This day already has notes in the database, adding a new note to it...'
          );
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log('Time already exists on this day');
      }
    } else {
      // If the day does not exist, add a new day to the schedules array
      const update = {
        $push: { 'schedules.$[].days': { day, notes: [{ time, note }] } }
      };
      const options = {
        arrayFilters: [{ 's.days.day': day }]
      };
      try {
        await Schedules.findOneAndUpdate({ username }, update, options);
        console.log(
          'This day does not exist in the database, adding it to the schedules array...'
        );
      } catch (error) {
        console.error(error);
      }
    }
  } else {
    // Schedule does not exist, create it
    console.log('Schedule does not exist for this user, creating it...');
    createScheduleInDB(username, day, time, note);
  }
};
