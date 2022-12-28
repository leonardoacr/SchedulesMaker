import _ from 'lodash'; // we need this to break lines automatically when inserting the strings on EJS
import express from 'express';
const app = express();

// Express and EJS
app.locals.htmlDisplay = (html: string) =>
  _.escape(html).replace(/\n/g, '<br>');
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //enable express to parse URL-encoded body i.e. info from HTML form
app.set('views', ['./views/week-days', './views']);
app.set('view engine', 'ejs'); // setting up EJS
app.use(express.static('public')); // define public and static folder (js and css files)

// Database config.
import passport from 'passport';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const flash = require('connect-flash');
import DBConfig from './helpers/connectDB';
import routes from './routes/userRoutes';
import { middlewareGlobal } from './middlewares/messages';

(async () => {
  const dataBaseName = 'Schedule-Maker';
  const connectDB = new DBConfig(dataBaseName).connectMongoDBCloud();
  await connectDB;
  const sessionOptions = await new DBConfig(dataBaseName).sessionOptionsFnc();
  const options = await sessionOptions;
  await app.use(options);
  await app.use(passport.initialize());
  await app.use(passport.session());
  // console.log('olha isso: ' + await passport.session())

  await app.use(flash());
  // Call routes and middlewares
  await app.use(middlewareGlobal);
  await app.use(routes); // routes
})();

export default app;
