import connectRedis from 'connect-redis';
import session from 'express-session';
import Redis from 'ioredis';

import { logLevel, redisAddress, sessionSecret } from '../config';

const client = new Redis(redisAddress);

if (logLevel === 'debug') {
  client
    .monitor()
    .then((monitor) => {
      monitor.on('monitor', (time, args, source, database) => {
        if (database === '0') {
          // eslint-disable-next-line no-console
          console.debug(`[REDIS] ${time}: '${database}', '${source}', '${args.join(',')}'`);
        }
      });
    });
}

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
