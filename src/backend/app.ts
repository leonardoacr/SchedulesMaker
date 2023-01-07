import _ from 'lodash'; // we need this to break lines automatically when inserting the strings on EJS
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors()); // enable cors

// Express and EJS
app.locals.htmlDisplay = (html: string) =>
  _.escape(html).replace(/\n/g, '<br>');
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //enable express to parse URL-encoded body i.e. info from HTML form

// require node:path to replace \ to / into dirname
import path from 'node:path';

// Taking __dirname and turning to string so we can change /public directory
const pathDIR = __dirname;
const formatDIR = pathDIR.split(path.sep).join('/');
console.log(formatDIR.replace('/backend', 'views'));
const viewsPath = formatDIR.replace('backend', 'views');
const publicPath = formatDIR.replace('backend', 'public');

console.log("Views Path check: " + viewsPath)
console.log('Public Path check: ' + publicPath);
// setting up EJS
app.set('views', viewsPath);
// app.set('views', ['./../views/week-days', './../views']);
app.set('view engine', 'ejs'); // setting up EJS
app.use(express.static(publicPath)); // define public and static folder (js and css files)

// Database config.
import passport from 'passport';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const flash = require('connect-flash');
import DBConfig from './helpers/connectDB';
import loginRoutes from './routes/userRoutes';
import schedulesRoutes from './routes/schedulesRoutes';

import { middlewareGlobal } from './middlewares/messages';

(async () => {
  const dataBaseName = 'Schedule-Maker';
  const connectDB = new DBConfig(dataBaseName).connectMongoDBCloud();
  await connectDB;
  const sessionOptions = await new DBConfig(dataBaseName).sessionOptionsFnc();
  const options = await sessionOptions;
  app.use(options);
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(flash());
  // Call routes and middlewares
  app.use(middlewareGlobal);
  app.use(loginRoutes); // routes
  app.use(schedulesRoutes); // routes
})();

export default app;
