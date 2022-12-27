import { Request } from 'express';
import passport from 'passport';
import { verifyLoginErrors } from '../helpers/loginErrors';
import { Users, Login } from '../models/UsersModel';
// import { verifyLoginErrors } from '../helpers/loginErrors';

// import { bcrypt } from 'bcrypt';
// import { jwt } from 'jsonwebtoken';

// Sign In controllers
// eslint-disable-next-line @typescript-eslint/no-explicit-any

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signIn = (req: Request, res: any) => {
    res.render('signin');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userLogin = async (req: Request, res: any) => {
    const userLogin = new Users({
        username: req.body.username,
        password: req.body.password
    });

    req.login(userLogin, function (err) {
        if (err) {
            console.log('Login errors: ' + err);
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/schedules");
            });
        }
    });

}

// Sign Up controllers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signUp = (req: Request, res: any) => {
    res.render('signup');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userRegister = async (req: any, res: any) => {
    const login = new Login(req.body);
    await login.signUp();
    console.log('userRegister: ' + login.errors);
    await verifyLoginErrors(login.errors, req, res);
    console.log('errors register: ' + login.errors)
    if (login.errors.length > 0) { return; }
    const { username, password } = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Users.register({ username: username }, password, function (err, users) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/schedules");
            });
        }
    });
}