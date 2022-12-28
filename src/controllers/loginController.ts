import { Request } from 'express';
import passport from 'passport';
import { Users } from '../models/UsersModel';

passport.use(Users.createStrategy());
// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser(function (users: any, done) {
    done(null, users.id);
});

passport.deserializeUser(function (id, done) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Users.findById(id, function (err: Error, users: any) {
        done(err, users);
    });
});

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
    console.log('chegou aqui?');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req.logout(function (err: any) {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/');
        }
    });
};
