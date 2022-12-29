import { Schedules } from "../models/SchedulesModel";
import { createScheduleInDB } from "./createScheduleInDB";

export const updateScheduleInDB = async (username: string, day: string, time: string, note: string): Promise<void> => {
    const user = await Schedules.findOne({ username });

    if (user) {
        // Check if the day already exists in the schedules array
        const dayExists = user.schedules.some(schedule => schedule.days.some(d => d.day === day));
        if (dayExists) {
            // If the day exists, update the schedule for the given day by adding a new note to the notes array
            await Schedules.findOneAndUpdate(
                { username, "schedules.days.day": day },
                { $push: { "schedules.$[].days.$[].notes": { time, note } } }
            );
        } else {
            // If the day does not exist, add a new day to the schedules array
            await Schedules.findOneAndUpdate(
                { username },
                { $push: { "schedules.$[].days": { day, notes: [{ time, note }] } } }
            );
        }
    } else {
        // Schedule does not exist, create it
        console.log('Schedule does not exist, creating it...');
        createScheduleInDB(username, day, time, note);
    }
};
