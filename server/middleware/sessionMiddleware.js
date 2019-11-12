import session from 'koa-session';
import redisStore from 'koa-redis';
import Redis from 'ioredis';

import { redisAddress } from '../config';

export const client = new Redis(redisAddress);

export default app => session({
  store: redisStore({
    client,
  }),
}, app);
