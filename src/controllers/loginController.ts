import { Request } from 'express';

// Sign in controllers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signIn = (req: Request, res: any) => {
  res.render('signin');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userLogin = async (req: any, res: any) => {
  req.session.userData = req.body.username;
  req.session.authenticated = req.isAuthenticated();
  res.redirect('/schedules');
};

// Sign Up controllers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signUp = (req: Request, res: any) => {
  res.render('signup');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userRegister = async (req: any, res: any) => {
  req.session.userData = req.body.username;
  req.session.authenticated = req.isAuthenticated();
  res.redirect('/schedules');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signOut = (req: any, res: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req.logout(function (err: any) {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/');
    }
  });
};
