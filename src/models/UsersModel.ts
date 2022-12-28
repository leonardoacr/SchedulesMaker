import mongoose from 'mongoose';
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
export const Users = mongoose.model(collectionName, userSchema);
