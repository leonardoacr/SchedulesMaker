import { Request, Response } from 'express';
import passport from 'passport';
import validator from 'validator';
import { verifyLoginErrors } from '../helpers/loginErrors';
import { Users } from '../models/UsersModel';

let errors: string[] = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let user: any = '';
export const middlewareLoginAuth = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  errors = [];
  const body = req.body;
  validate(body);
  if (errors.length > 0) {
    return verifyLoginErrors(errors, req, res);
  } // verify if there is any errors
  try {
    user = userExists(body);
    if (await user) {
      //console.log('User found on the database.');
      const userLogin = new Users({
        username: body.username,
        password: body.password
      });
      //console.log('UserLogin: ' + userLogin);
      req.login(userLogin, function (err) {
        if (err) {
          //console.log('Login errors: ' + err);
        } else {
          passport.authenticate('local', function (err, user) {
            if (err) {
              // An error occurred during authentication
              return res.status(500).send(err);
            }
            if (!user) {
              // Authentication failed
              errors.push('Wrong password.');
              return verifyLoginErrors(errors, req, res);
            } else {
              next();
            }
          })(req, res, next);
        }
      });
    } else {
      errors.push('User does not exist.');
      verifyLoginErrors(errors, req, res);
    }
  } catch (error) {
    //console.log('error on middlewareLoginAuth..' + error);
  }
};

export const middlewareRegisterAuth = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  const body = req.body;
  validate(body);
  if (errors.length > 0) {
    //console.log('teste: ' + errors);
    return verifyLoginErrors(errors, req, res);
  } // verify if there is any errors
  try {
    //console.log('Registrando...');
    if (await userExists(body)) {
      errors.push('A user with the given email is already registered.');
      verifyLoginErrors(errors, req, res);
    } else {
      //console.log('User created on database.');
      const { username, password } = body;
      Users.register({ username: username }, password, function (err) {
        if (err) {
          //console.log('Sign up error...' + err);
          res.redirect('/register');
        } else {
          passport.authenticate('local')(req, res, function () {
            next();
          });
        }
      });
    }
  } catch (error) {
    //console.log(error);
  }
};

async function userExists(body: { username: string }) {
  return await Users.findOne({ username: body.username }, { _id: 0, __v: 0 });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validate(body: any) {
  // email needs to be valid - I'll be using validator package to check this
  if (!validator.isEmail(body.username)) {
    errors.push('Invalid email, please try again with a valid one.');
  }
}
