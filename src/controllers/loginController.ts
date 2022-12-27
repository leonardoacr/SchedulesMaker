import { Request } from 'express';
import passport from 'passport';
import { Users } from '../models/UsersModel';
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
    // const login = new UsersModelScript.Login(req.body);
    // await login.signIn();
    // console.log('userLogin: ' + login.errors);
    // await verifyLoginErrors(login.errors, req, res);
    // if (login.errors.length === 0) {
    //     req.session.user = login.user;
    //     console.log('req session user declaring: ' + await req.session.user)
    //     const objectRender = {
    //         email: login.body.email
    //     }
    //     res.render('schedules', objectRender);
    // }
    const userLogin = new Users({
        username: req.body.username,
        password: req.body.password
    });

    req.login(userLogin, function (err) {
        if (err) {
            console.log('deu ruim no login: ' + err);
        } else {
            console.log('ta aqui? antes olha o users: ' + userLogin)
            passport.authenticate("local")(req, res, function () {
                console.log('Indo pro schedules..')
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
    // const login = new UsersModelScript.Login(req.body);
    // await login.signUp();
    // console.log('userRegister: ' + login.errors);
    // await verifyLoginErrors(login.errors, req, res);
    // if (login.errors.length === 0) {
    //     const objectRender = {
    //         email: login.body.email
    //     }
    //     res.render('schedules', objectRender);
    // }
    // const { email, password } = req.body;
    // console.log('testando: ' + localUsername)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Users.register({ username: 'testeemail@gmail.com' }, 'testesenha', function (err, users) {
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