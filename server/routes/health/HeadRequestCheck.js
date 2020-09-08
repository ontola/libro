import * as HttpStatus from 'http-status-codes';

import API from '../../API';
import { requestBackendManifest } from '../../utils/manifest';

import Check from './check';

export default class HeadRequestCheck extends Check {
  constructor(ctx, tenant) {
    super('Backend data fetching');

    this.ctx = ctx;
    this.tenant = tenant;
  }

  // eslint-disable-next-line class-methods-use-this
  async runTest() {
    const api = new API(this.ctx);
    const res = await api.headRequest({
      headers: {
        ...this.ctx.request.headers,
        'Content-Type': 'application/hex+x-ndjson',
      },
      url: '/',
    });
    if (res.status >= HttpStatus.BAD_REQUEST) {
      return new Error(`Unexpected status '${res.status}' for 'HEAD /'.`);
    }

    const manifestLocation = Check.appendPath(this.tenant?.location, 'manifest.json');
    const mstRes = await requestBackendManifest(api, manifestLocation);

    if (mstRes.status === HttpStatus.FORBIDDEN) {
      return new Error('Token has wrong permissions');
    }

    return undefined;
  }
}
