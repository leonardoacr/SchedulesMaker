import { Schedules } from '../models/SchedulesModel';

export const updateNoteInDB = async (
  username: string,
  day: string,
  oldTime: string,
  oldNote: string,
  newTime: string,
  newNote: string
): Promise<void> => {
  //console.log(
  // 'Updating note in DB: ' +
  //   '\n Old Note and Time: ' +
  //   oldNote +
  //   ' ' +
  //   oldTime +
  //   '\n New Note and Time: ' +
  //   newNote +
  //   ' ' +
  //   newTime
  // );
  try {
    // Define the filter to match the document you want to update
    const filter = {
      username: username,
      schedules: {
        $elemMatch: {
          days: {
            $elemMatch: {
              day,
              notes: {
                $elemMatch: {
                  note: oldNote,
                  time: oldTime
                }
              }
            }
          }
        }
      }
    };

    // Define the update operation to set the new values for the "note" and "time" fields
    const update = {
      $set: {
        'schedules.$[schedule].days.$[day].notes.$[note].note': newNote,
        'schedules.$[schedule].days.$[day].notes.$[note].time': newTime
      }
    };

    // Define the array filters to specify which elements in the nested arrays should be updated
    const arrayFilters = [
      { 'schedule.days.notes.note': oldNote },
      { 'day.notes.note': oldNote },
      { 'note.note': oldNote }
    ];

    // Use the updateOne() method to update the document
    const result = await Schedules.updateOne(filter, update, { arrayFilters });
    console.log(`Updated ${result.modifiedCount} document`);
  } catch (error) {
    //console.log('Update not successful');
    console.log(error);
  }
};
