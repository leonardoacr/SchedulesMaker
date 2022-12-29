import { Schedules } from "../models/SchedulesModel";
import { saveScheduleInDB } from "./saveScheduleInDB";

export const updateScheduleInDB = async (username: string, day: string, time: string, note: string): Promise<void> => {
    const user = await Schedules.findOne({ username: username });
    console.log('olha os dados ' + [username, day, time, note])
    if (user) {
        // Check if the day already exists in the schedules array
        const dayExists = user.schedules.some(schedule => schedule.day === day);
        if (dayExists) {
            // If the day exists, update the schedule for the given day by adding a new note to the notes array
            await Schedules.findOneAndUpdate(
                { username: username, "schedules.day": day },
                { $push: { "schedules.$.notes": { time, note } } }
            );
            console.log('User updated...')
        } else {
            // If the day does not exist, add a new day to the schedules array
            await Schedules.findOneAndUpdate(
                { username: username },
                { $push: { schedules: { day, notes: [{ time, note }] } } }
            );
            console.log('New day added...')
        }
    } else {
        // Schedule does not exist, create it
        console.log('Schedule does not exist, creating it...')
        saveScheduleInDB(username, day, time, note);
    }
}
