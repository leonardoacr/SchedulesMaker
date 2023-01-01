import { Request, Response } from 'express';

export const schedules = async (req: Request, res: Response) => {
  const username = req.session.userData;
  const objectRender = {
    email: username
  };
  res.render('schedules', objectRender);
};

export const getDay = async (req: Request, res: Response) => {
  console.log('oi ta aqui? ' + req.body.day);
  const day = req.body.day;
  res.redirect(`/schedules/week-days/${day}`);
};
