import express from 'express';

import { PORT } from '../app/config';

import routes, { listen } from './routes';

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

async function start() {
  await routes(app, PORT);
  listen(app, PORT);
}

if (__DEVELOPMENT__) {
  // eslint-disable-next-line no-inline-comments
  import(/* webpackChunkName: "devMiddleware" */ './middleware/devMiddleware')
    .then(({ default: devMiddleware }) => {
      devMiddleware(app);
      start();
    });
} else {
  start();
}
