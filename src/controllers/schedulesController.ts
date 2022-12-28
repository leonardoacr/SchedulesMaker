import { Request, Response } from 'express';

export const schedules = async (req: Request, res: Response) => {
  const username = req.session.userData;
  const objectRender = {
    email: username
  };
  res.render('schedules', objectRender);
};
