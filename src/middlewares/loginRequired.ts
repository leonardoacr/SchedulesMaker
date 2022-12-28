import { Request, Response } from 'express';
const middlewareLoginRequired = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  console.log('User authentication middleware...');
  if (!req.session.authenticated) {
    console.log('User not authenticated:' + req);
    res.redirect('back');
    return;
  }
  console.log('User has been authenticated.');
  next();
};

export { middlewareLoginRequired };
