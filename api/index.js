import express from 'express';
//import http from 'http';
//import morgan from 'morgan';
import bodyParser from 'body-parser';
//import cors from 'cors';
//import helmet from 'helmet';
//import cookieParser from 'cookie-parser';
import fs from 'fs';

// API routes
import routes from './routes.js';

const app = express();
//const logPath = __dirname + '/../logs/api.log';
//const accessLogStream = fs.createWriteStream(logPath, { flags: 'a' });

app.set('trust proxy', 1);
//app.use(cookieParser());
//app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
//app.use(cors());
//app.use(helmet());
app.use(routes);


app.listen(3030, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('Api listening on http://localhost:3030');
});
