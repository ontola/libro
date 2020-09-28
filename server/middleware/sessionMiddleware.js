import session from 'koa-session';
import redisStore from 'koa-redis';
import Redis from 'ioredis';

import { redisUrl, sessionCookieName } from '../config';

export const client = new Redis(redisUrl);

export default (app) => session({
  key: sessionCookieName,
  store: redisStore({
    client,
  }),
}, app);
