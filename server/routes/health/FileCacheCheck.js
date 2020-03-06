import { fileFromCache } from '../../utils/cache';

import Check from './check';
import WarningError from './WarningError';

export default class FileCacheCheck extends Check {
  constructor(tenant) {
    super('File cache');
    this.tenant = tenant;
  }

  async runTest() {
    return fileFromCache(this.tenant.location) || new WarningError("Can't read core ns from cache");
  }
}
