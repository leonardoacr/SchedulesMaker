import mongoose from 'mongoose';
import validator from 'validator';
import passportLocalMongoose from 'passport-local-mongoose';
// import findOrCreate from 'mongoose-findorcreate';
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

export class Login {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any;
    errors: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any;
    constructor(body: string) {
        this.body = body;
        this.errors = [];
        this.user = '';
    }

    async signIn() {
        this.validate();
        if (this.errors.length > 0) return; // verify if there is any errors
        try {
            this.user = this.userExists();
            if (await this.user) {
                console.log('User found on the database.');
            } else {
                this.errors.push('User does not exist.');
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async signUp() {
        this.validate();
        if (this.errors.length > 0) return; // verify if there is any errors
        try {
            console.log('Registrando...')
            if (await this.userExists()) {
                console.log('User found on the database.');
                this.errors.push('A user with the given email is already registered.');
                return;
            } else {
                console.log('User created on database.')
                return;
            }

        } catch (error) {
            console.log(error);
        }
    }

    async userExists() {
        return await Users.findOne({ username: this.body.username });
    }

    validate() {
        // email needs to be valid
        // let's use validator (npm i validator) to check this
        if (!validator.isEmail(this.body.username)) this.errors.push('Invalid email, please try again with a valid one.');
    }
}
