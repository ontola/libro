import * as HttpStatus from 'http-status-codes';

import API from '../../API';
import { requestBackendManifest } from '../../utils/manifest';

import Check from './check';

export default class HeadRequestCheck extends Check {
  constructor() {
    super('Backend data fetching');
  }

  // eslint-disable-next-line class-methods-use-this
  async runTest() {
    const api = new API({ request: { headers: {} } });
    await api.headRequest({
      headers: {
        'Content-Type': 'application/hex+x-ndjson',
      },
      url: '/',
    });

    if ((await requestBackendManifest(api)).status === HttpStatus.FORBIDDEN) {
      return new Error('Token has wrong permissions');
    }

    return undefined;
  }
}
