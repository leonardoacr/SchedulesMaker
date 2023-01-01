import { Schedules } from '../models/SchedulesModel';

export const clearNotesInDB = async (
  username: string,
  day: string,
): Promise<void> => {
  try {
    // Define the filter to match the notes to delete
    const filter = {
      username: username,
      schedules: {
        $elemMatch: {
          days: {
            $elemMatch: {
              day: day
            }
          }
        }
      }
    };

    // Define the update operation to remove the note array that contains the input
    const update = {
      $pull: {
        'schedules.$.days': {
          day: day
        }
      }
    };

    const result = await Schedules.updateOne(filter, update);
    console.log(`Deleted ${result.modifiedCount} document`);
  } catch (error) {
    console.log('Delete not successful');
    console.log(error);
  }
};
