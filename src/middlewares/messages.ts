import { Request, Response } from 'express';
const middlewareGlobal = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  console.log('Loading middleware messages..');
  res.locals.errors = [];
  res.locals.errors = req.flash('errors');
  res.locals.user = req.session.user;
  next();
};

export { middlewareGlobal };
