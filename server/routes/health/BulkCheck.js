import { OK } from 'http-status-codes';

import API from '../../API';
import { enhanceCtx } from '../../middleware/ctxMiddleware';

import Check from './check';
import WarningError from './WarningError';

const MIN_DOC_LENGTH = 10;

function duplicateCtx(ctx) {
  const newCtx = enhanceCtx({
    ...ctx,
  });
  newCtx.api = new API(newCtx);
  newCtx.session = { ...ctx.session };

  return newCtx;
}

export default class BulkCheck extends Check {
  constructor(ctx, tenant) {
    super('Bulk endpoint');
    this.ctx = ctx;
    this.tenant = tenant;
  }

  async runTest() {
    const testCtx = duplicateCtx(this.ctx);
    testCtx.websiteIRI = this.tenant.location;

    const res = await testCtx.api.bulk([
      this.tenant.location,
    ], {
      'user-agent': 'libro health-check; BulkCheck',
    });

    if (res?.status !== OK) {
      return new WarningError(`Can't read core ns from bulk (status: ${res?.status})`);
    }

    const body = await res.text();

    return body.match(/]\n/g).length > MIN_DOC_LENGTH;
  }
}
