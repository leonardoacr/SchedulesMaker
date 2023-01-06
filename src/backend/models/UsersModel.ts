import mongoose, { PassportLocalModel } from 'mongoose';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  googleId: String,
  secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const collectionName = 'Users';
const Users = mongoose.model(collectionName, userSchema) as PassportLocalModel<any> & typeof userSchema;

passport.use(Users.createStrategy());
passport.serializeUser(function (users: any, done) {
  done(null, users.id);
});

passport.deserializeUser(function (id, done) {
  Users.findById(id, function (err: Error, users: any) {
    done(err, users);
  });
});

const GOOGLE_CLIENT_ID = process.env.CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET as string;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://www.example.com/auth/google/callback"
},
  function (accessToken, refreshToken, profile, cb) {
    Users.findOneAndUpdate({ googleId: profile.id }, { googleId: profile.id }, { upsert: true, new: true }, function (err, user) {
      return cb(err, user);
    });
  }
));

export { Users };
