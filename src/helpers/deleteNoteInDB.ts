import { Schedules } from '../models/SchedulesModel';

export const deleteNoteInDB = async (
  username: string,
  day: string,
  time: string,
  note: string
): Promise<void> => {
  console.log('Deleting note in DB: ' + note + ' ' + time);
  try {
    // Define the filter to match the notes to delete
    const filter = {
      username: username,
      schedules: {
        $elemMatch: {
          days: {
            $elemMatch: {
              day,
              notes: {
                $elemMatch: {
                  note: note,
                  time: time
                }
              }
            }
          }
        }
      }
    };

    // Define the update operation to remove the note array that contains the input
    const update = {
      $pull: {
        'schedules.$[schedule].days.$[day].notes': {
          note: note,
          time: time
        }
      }
    };

    // Defining the array filters to match the notes to delete
    const arrayFilters = [
      { 'schedule.days.notes.note': note },
      { 'day.notes.note': note }
    ];

    // Using the updateOne() method to update the document with the deleted note
    const result = await Schedules.updateOne(filter, update, { arrayFilters });
    console.log(`Deleted ${result.modifiedCount} document`);
  } catch (error) {
    console.log('Delete not successful');
    console.log(error);
  }
};
