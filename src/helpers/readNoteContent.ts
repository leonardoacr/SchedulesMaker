import { Schedules } from '../models/SchedulesModel';
import { createScheduleInDB } from './createScheduleInDB';

let indexDay: number;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const readNoteContent = async (username: any, dayInput: string) => {
  // find the user in the database and the day of the week to get the notes and time
  console.log('Reading note content...');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schedule = await Schedules.findOne({ username: username });
  if (schedule !== null) {
    console.log('Reading data for: ' + dayInput);
    indexDay = -1; // initialize indexDay to an invalid value
    for (
      let daysIndexDB = 0;
      daysIndexDB < schedule.schedules[0].days.length;
      daysIndexDB++
    ) {
      if ((await schedule.schedules[0].days[daysIndexDB].day) === dayInput) {
        indexDay = daysIndexDB;
        break; // exit the loop once the day is found
      }
    }
    const loadNotes: string[] = [];
    const loadTimes: string[] = [];
    if (await schedule.schedules[0].days[indexDay]) {
      for (const noteIndex in await schedule.schedules[0].days[indexDay]
        .notes) {
        loadNotes[noteIndex] = await schedule.schedules[0].days[indexDay].notes[
          noteIndex
        ].note;
        loadTimes[noteIndex] = await schedule.schedules[0].days[indexDay].notes[
          noteIndex
        ].time;
      }
    } else {
      console.log('Day not found in schedule');
      return [[], []];
    }

    const noteContent = [loadNotes, loadTimes];

    const organizedNotes = [
      noteContent[0]
        .map((note, index) => ({
          note,
          time: noteContent[1][index]
        }))
        .sort((a, b) => {
          const aTime: number = new Date(`January 1, 2020 ${a.time}`).getTime();
          const bTime: number = new Date(`January 1, 2020 ${b.time}`).getTime();
          return aTime - bTime;
        })
        .map(({ note }) => note),
      noteContent[0]
        .map((note, index) => ({
          note,
          time: noteContent[1][index]
        }))
        .sort((a, b) => {
          const aTime = new Date(`January 1, 2020 ${a.time}`).getTime();
          const bTime = new Date(`January 1, 2020 ${b.time}`).getTime();
          return aTime - bTime;
        })
        .map(({ time }) => time)
    ];
    // console.log('Notes readed: ' + organizedNotes)
    return organizedNotes;
  } else {
    console.log('user not found, empty schedule');
    // Creating new schedule for the user
    await createScheduleInDB(username, 'monday', '01:00 AM', 'My First Note');
  }
};
