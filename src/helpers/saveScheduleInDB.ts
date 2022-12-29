import { Schedules } from '../models/SchedulesModel';

export const saveScheduleInDB = async (username: string, day: string, time: string, note: string): Promise<void> => {
    const newSchedule = {
        username: username,
        schedules: [
            {
                day: day,
                notes: [
                    {
                        time: time,
                        note: note
                    }
                ]
            }
        ]
    };

    const mongooseSchedule = new Schedules(newSchedule);

    try {
        await mongooseSchedule.save();
        console.log('createSchedule saved successfully!');
    } catch (error) {
        console.log('Error while saving createSchedule: ' + error);
    }
}
