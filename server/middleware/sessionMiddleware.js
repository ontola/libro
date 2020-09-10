import session from 'koa-session';
import redisStore from 'koa-redis';
import Redis from 'ioredis';

import { redisAddress, sessionCookieName } from '../config';

export const client = new Redis(redisAddress);

export default (app) => session({
  key: sessionCookieName,
  store: redisStore({
    client,
  }),
}, app);
