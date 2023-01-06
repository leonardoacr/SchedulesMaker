import mongoose from 'mongoose';
import app from '../app';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const session = require('express-session');

declare module 'express-session' {
  export interface SessionData {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userData: { [key: string]: any };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authenticated: { authenticated: boolean };
  }
}

declare module 'express-session' {
  export interface SessionData {
    user: {
      _id: string;
      email: string;
      password: string;
      __v: number;
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const MongoStore = require('connect-mongo');

const getConnectionString = process.env.CONNECTIONSTRING as string;
let connectionString;

class DBConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataBaseName: any;
  constructor(dbName: string) {
    this.dataBaseName = dbName;
  }

  async connectMongoDBCloud() {
    connectionString = getConnectionString.replace('name', this.dataBaseName);
    mongoose.set('strictQuery', false);
    await mongoose
      .connect(connectionString)
      .then(() => {
        //console.log('MongoDB Cloud Server Database running!');
        app.emit('MongoDB Cloud Server Database running!');
      })
      .catch(() => {
        //console.log('MongoDB Cloud Server Database failed connection');
      });
  }
  async sessionOptionsFnc() {
    connectionString = getConnectionString.replace('name', this.dataBaseName);
    //console.log('Session-express loaded!');
    return await session({
      secret: 'pasjdapsojp+asdoij23',
      store: MongoStore.create({ mongoUrl: connectionString }),
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 24 * 7, // session will last for 7 days
        httpOnly: true
      }
    });
  }
}

export default DBConfig;
