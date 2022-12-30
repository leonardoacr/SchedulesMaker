import { Request, Response } from 'express';
import { readNoteContent } from '../helpers/readNoteContent';
import { updateNoteInDB } from '../helpers/updateNoteInDB';
import { updateScheduleInDB } from '../helpers/updateScheduleInDB';

export const weekDays = async (req: Request, res: Response) => {
  console.log('ta aqui em dias da semana...' + req.session.userData);
  const username = req.session.userData;
  const dayInput = req.params.day;
  const noteContent = await readNoteContent(username, dayInput);
  let noteContentText: string[] = [];
  let noteContentTime: string[] = [];
  if (noteContent !== undefined) {
    noteContentText = noteContent[0];
    noteContentTime = noteContent[1];
  }
  console.log('teste do note content: ' + noteContentText);
  const objectRender = {
    email: username,
    noteContentText: noteContentText,
    noteContentTime: noteContentTime,
    oldNote: noteContentText,
    oldTime: noteContentTime,
    selectedDay: dayInput
  };
  res.render('week-days/day', objectRender);
};

export const crudNote = async (req: Request, res: Response) => {
  console.log('Action to do: ' + req.body.action)
  if (req.body.action === 'create') {
    console.log('Adding new note...');
    const timeInput = req.body.clockDisplayCreate;
    const noteInput = req.body.noteTextCreate;
    const dayInput = req.params.day;
    const username = req.session.userData as unknown as string;
    console.log('Data to save in DB: ' + username + ' ' + dayInput + ' ' + timeInput + ' ' + noteInput);
    await updateScheduleInDB(username, dayInput, timeInput, noteInput);
    res.redirect(req.originalUrl);
  }
  if (req.body.action === 'update') {
    // console.log('Old data: ' + req.body.oldTime + ' ' + req.body.oldNote);
    // console.log('Data to update: ' + req.body.noteTextUpdate + ' ' + req.body.clockDisplayUpdate);
    const timeInput = req.body.clockDisplayUpdate;
    const noteInput = req.body.noteTextUpdate;
    const dayInput = req.params.day;
    const oldTimeInput = req.body.oldTime;
    const oldNoteInput = req.body.oldNote;
    const username = req.session.userData as unknown as string;
    console.log('old Note input: ' + oldNoteInput);
    console.log('old Time input: ' + oldTimeInput);
    await updateNoteInDB(username, dayInput, oldTimeInput, oldNoteInput, timeInput, noteInput);
    res.redirect(req.originalUrl);
  }

};