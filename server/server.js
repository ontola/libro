import express from 'express';

import { PORT } from '../app/config';

import devMiddleware from './middleware/devMiddleware';
import routes, { listen } from './routes';

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

if (__DEVELOPMENT__) {
  devMiddleware(app);
}

routes(app, PORT);
listen(app, PORT);
