import Koa from 'koa';

import routes, { listen } from './routes';
import { port, sessionSecret } from './config';

const app = new Koa();

app.keys = [sessionSecret];

app.proxy = true;

async function start() {
  await routes(app, port);
  listen(app, port);
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
