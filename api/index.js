import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes.js';
import cors from 'cors';

const app = express();
const port = 3030;

app.set('trust proxy', 1);
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('Api listening on http://localhost:%s', port);
});
