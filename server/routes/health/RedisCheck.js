import { client } from '../../middleware/sessionMiddleware';

import Check from './check';

export default class RedisCheck extends Check {
  constructor() {
    super('Redis connectivity');
  }

  // eslint-disable-next-line class-methods-use-this
  async runTest() {
    await client.get('');
  }
}
