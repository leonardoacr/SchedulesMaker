import { Request, Response } from 'express';
import { readNoteContent } from '../helpers/readNoteContent';

export const schedules = async (req: Request, res: Response) => {
  const username = req.session.userData;
  await readNoteContent(username, 'monday');
  const objectRender = {
    email: username
  };
  res.render('schedules', objectRender);
};

export const getDay = async (req: Request, res: Response) => {
  const day = req.body.day;
  res.redirect(`/schedules/week-days/${day}`);
};



