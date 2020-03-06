import { createToken } from '../maps';

import Check from './check';

export default class MapTokenCheck extends Check {
  constructor() {
    super('Maps access token generation');
  }

  // eslint-disable-next-line class-methods-use-this
  async runTest() {
    const [_, accessToken] = await createToken();

    if (!accessToken || accessToken.length === 0) {
      throw new Error('Invalid maps access token format');
    }
  }
}
