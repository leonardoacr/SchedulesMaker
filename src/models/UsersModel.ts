import mongoose from 'mongoose';
import validator from 'validator';
import passportLocalMongoose from 'passport-local-mongoose';
// import findOrCreate from 'mongoose-findorcreate';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
    email: String,
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
                // console.log('teste aqui:' + this.errors);
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
                this.errors.push('User found on the database, please insert a new one.');
                return;
            } else {
                this.user = await Users.create(this.body);
                console.log('User created on database.')
                return;
            }

        } catch (error) {
            console.log(error);
            // if(this.user) this.errors.push('Usuário já existe.');
        }
    }

    async userExists() {
        return await Users.findOne({ email: this.body.email });
    }

    validate() {
        this.cleanUp();
        // email needs to be valid
        // let's use validator (npm i validator) to check this
        if (!validator.isEmail(this.body.email)) this.errors.push('Invalid email, please try again with a valid one.');
    }

    cleanUp() {
        // this loop will make sure the inputs are strings
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        // if we use other kinds of security it is better to make sure the body will be distributed correctly
        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

// export * from '../models/Users';
