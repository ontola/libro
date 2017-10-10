import connectRedis from 'connect-redis';
import session from 'express-session';
import Redis from 'ioredis';

import { redisAddress } from '../config';

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  console.log('NO SESSION SECRET');
  process.exit(1);
}

const client = new Redis(redisAddress);

const RedisStore = connectRedis(session);
const redisStore = new RedisStore({
  client,
});

export default session({
  cookie: {
    httpOnly: true,
    secure: true,
  },
  proxy: true,
  resave: false,
  saveUninitialized: true,
  secret: sessionSecret,
  store: redisStore,
});
