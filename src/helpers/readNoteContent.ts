import { Schedules } from '../models/SchedulesModel';

let indexDay: number;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const readNoteContent = async (username: any, dayInput: string) => {
    // find the user in the database and the day of the week to get the notes and time
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schedule = await Schedules.findOne(
        { username: username }
    );
    if (schedule !== null) {
        console.log('day test: ' + dayInput)
        assignIndexDay(dayInput);
        console.log('indexDay: ' + indexDay);
        const loadNotes: string[] = [];
        const loadTimes: string[] = [];
        for (const noteIndex in schedule.schedules[0].days[indexDay].notes) {
            loadNotes[noteIndex] = await schedule.schedules[0].days[indexDay].notes[noteIndex].note;
            loadTimes[noteIndex] = await schedule.schedules[0].days[indexDay].notes[noteIndex].time;
        }
        console.log(loadNotes + ' ' + loadTimes);
        const noteContent = [loadNotes, loadTimes];
        return noteContent;
    } else {
        console.log('user not found, empty schedule');
    }
}

function assignIndexDay(dayInput: string) {
    switch (dayInput) {
        case 'monday':
            indexDay = 0;
            break;
        case 'tuesday':
            indexDay = 1;
            break;
        case 'wednesday':
            indexDay = 2;
            break;
        case 'thursday':
            indexDay = 3;
            break;
        case 'friday':
            indexDay = 4;
            break;
        case 'saturday':
            indexDay = 5;
            break;
        case 'sunday':
            indexDay = 6;
            break;
        case 'notes':
            indexDay = 7;
            break;
        default:
            // Handle invalid input
            indexDay = 0;
            break;
    }
    return indexDay;
}