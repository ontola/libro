import session from 'koa-session';
import redisStore from 'koa-redis';
import Redis from 'ioredis';

import {
  redisUrl,
  sessionCookieName,
  standaloneLibro,
} from '../config'

export const client = new Redis(redisUrl, {
  maxRetriesPerRequest: standaloneLibro ? 0 : null,
});

export default (app) => session({
  key: sessionCookieName,
  store: redisStore({
    client,
  }),
}, app);
