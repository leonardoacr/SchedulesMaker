import mongoose from 'mongoose';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
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
const Users = mongoose.model(collectionName, userSchema);

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

export { Users }
