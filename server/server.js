import express from 'express';

import { PORT } from '../app/config';
import devMiddleware from './utils/devMiddleware';
import routes, { listen } from './routes';

const app = express();

if (__DEVELOPMENT__) {
  devMiddleware(app);
}

routes(app, PORT);
listen(app, PORT);
