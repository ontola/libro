import * as HttpStatus from 'http-status-codes';

import API from '../../API';
import { requestBackendManifest } from '../../utils/manifest';

import Check from './check';

export default class ManifestCheck extends Check {
  constructor(tenant) {
    super('Web manifest');
    this.tenant = tenant;
  }

  async runTest() {
    const { hostname, pathname } = new URL(this.tenant.location);

    const api = new API({
      req: {
        headers: {
          host: hostname,
        },
      },
    });
    try {
      const manifestRes = await requestBackendManifest(api, `${pathname}/manifest.json`);
      if (manifestRes.status === HttpStatus.FORBIDDEN) {
        return new Error('Backend token invalid');
      } else if (manifestRes.status !== HttpStatus.OK) {
        return new Error(`Expected manifest status 200, was ${manifestRes.status}`);
      }

      const manifest = await manifestRes.json();

      const {
        icons,
        ontola,
        scope,
        serviceworker,
      } = manifest;

      if (!scope?.trim()) {
        return new Error('Expected manifest to have a `scope` value');
      }

      if (typeof ontola !== 'object') {
        return new Error('Manifest holds no `ontola` object');
      } else if (typeof ontola.template !== 'string' || ontola.template.trim().length === 0) {
        return new Error('Manifest has no template key in `ontola` object');
      }

      if (typeof serviceworker !== 'object') {
        return new Error('Expected manifest to have a `serviceworker` object');
      } else if (!serviceworker.src?.trim()) {
        return new Error('Expected manifest serviceworker object to have a `src` value');
      } else if (!serviceworker.scope?.trim()) {
        return new Error('Expected manifest serviceworker object to have a `scope` value');
      }

      if (!Array.isArray(icons)) {
        return new Error('Expected manifest to have an `icons` array');
      }

      return undefined;
    } catch (e) {
      return new Error(e.message);
    }
  }
}
