import { Request, Response } from 'express';
import { clearNotesInDB } from '../helpers/clearScheduleInDB';
import { deleteNoteInDB } from '../helpers/deleteNoteInDB';
import { readNoteContent } from '../helpers/readNoteContent';
import { updateNoteInDB } from '../helpers/updateNoteInDB';
import { updateScheduleInDB } from '../helpers/updateScheduleInDB';

export const weekDays = async (req: Request, res: Response) => {
  const username = req.session.userData;
  const dayInput = req.params.day;
  const noteContent = await readNoteContent(username, dayInput);
  let noteContentText: string[] = [];
  let noteContentTime: string[] = [];
  if (noteContent !== undefined) {
    noteContentText = noteContent[0];
    noteContentTime = noteContent[1];
  }
  const objectRender = {
    email: username,
    noteContentText: noteContentText,
    noteContentTime: noteContentTime,
    selectedDay: dayInput
  };
  res.render('week-days/day', objectRender);
};

export const crudNote = async (req: Request, res: Response) => {
  //console.log('Action to do: ' + req.body.action);
  const dayInput = req.params.day;
  const username = req.session.userData as unknown as string;

  if (req.body.action === 'create') {
    //console.log('Creating note...');
    const timeInput = req.body.clockDisplayCreate;
    const noteInput = req.body.noteTextCreate;
    await updateScheduleInDB(username, dayInput, timeInput, noteInput);
    res.redirect(req.originalUrl);
  }
  if (req.body.action === 'update') {
    //console.log('Updating note...');
    const timeInput = req.body.clockDisplayUpdate;
    const noteInput = req.body.noteTextUpdate;
    const oldTimeInput = req.body.oldTime;
    const oldNoteInput = req.body.oldNote;
    //console.log('time and note loaded by the backend: ' + timeInput, noteInput);
    await updateNoteInDB(
      username,
      dayInput,
      oldTimeInput,
      oldNoteInput,
      timeInput,
      noteInput
    );
    res.redirect(req.originalUrl);
  }
  if (req.body.action === 'delete') {
    //console.log('Deleting note...');
    const timeInput = req.body.noteTimeDelete;
    const noteInput = req.body.noteTextDelete;
    //console.log(
    // 'Time and note loaded by the backend: ' + timeInput + ' ' + noteInput
    // );
    await deleteNoteInDB(username, dayInput, timeInput, noteInput);
    res.redirect(req.originalUrl);
  }
  if (req.body.action === 'clearNotes') {
    //console.log('Deleting everything of day ' + dayInput);
    await clearNotesInDB(username, dayInput);
    res.redirect(req.originalUrl);
  }
};
