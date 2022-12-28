import { Request, Response } from 'express';

export const weekDays = async (req: Request, res: Response) => {
  console.log('ta aqui em monday...' + req.session.userData);
  const username = req.session.userData;
  const objectRender = {
    email: username
  };
  res.render('week-days/monday', objectRender);
};
