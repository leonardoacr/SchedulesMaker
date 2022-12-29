import { Request, Response } from 'express';
import { updateScheduleInDB } from '../helpers/updateScheduleInDB';

export const weekDaysMonday = async (req: Request, res: Response) => {
  console.log('ta aqui em monday...' + req.session.userData);
  const username = req.session.userData;
  const objectRender = {
    email: username,
  };
  res.render('week-days/monday', objectRender);
};

export const weekDaysTuesday = async (req: Request, res: Response) => {
  console.log('ta aqui em tuesday...' + req.session.userData);
  const username = req.session.userData;
  const objectRender = {
    email: username
  };
  res.render('week-days/tuesday', objectRender);
};

export const createNote = async (req: Request, res: Response) => {
  console.log('ta aqui em adicionar nota...');
  const timeInput = req.body.clockDisplayCreate;
  const noteInput = req.body.noteTextCreate;
  const path = req.route.path;
  const words = path.split('/');
  const dayInput = words[words.length - 1];
  const username = req.session.userData as unknown as string;
  console.log('data: ' + username + ' ' + dayInput + ' ' + timeInput + ' ' + noteInput);
  updateScheduleInDB(username, dayInput, timeInput, noteInput);

  const objectRender = {
    email: username,
  };
  // res.render('week-days/monday', objectRender);
  res.render('week-days/' + dayInput, objectRender, (err) => {
    if (err) {
      // handle the error
    } else {
      res.redirect(req.originalUrl);
    }
  });
};