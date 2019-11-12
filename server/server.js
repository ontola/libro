import Koa from 'koa';

import { PORT } from '../app/config';

import routes, { listen } from './routes';
import { sessionSecret } from './config';

const app = new Koa();

app.keys = [sessionSecret];

app.proxy = true;

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
