import * as HttpStatus from 'http-status-codes';

import BackendCheck from './health/BackendCheck';
import Check, { CheckResult } from './health/check';
import EnvironmentCheck from './health/EnvironmentCheck';
import FileCacheCheck from './health/FileCacheCheck';
import HeadRequestCheck from './health/HeadRequestCheck';
import ManifestCheck from './health/ManifestCheck';
import MapTokenCheck from './health/MapTokenCheck';
import RedisCheck from './health/RedisCheck';
import renderHtml from './health/renderHtml';
import renderMarkdown from './health/renderMarkdown';

async function runTest(ctx, check) {
  try {
    await check.run();

    return check;
  } catch (e) {
    return new Check(
      check.name,
      CheckResult.fail,
      `Executing check failed with '${e.message}'`,
      e
    );
  }
}

export default async (ctx) => {
  try {
    ctx.response.status = HttpStatus.OK;

    const result = [];
    result.push(await runTest(ctx, new EnvironmentCheck()));
    result.push(await runTest(ctx, new RedisCheck()));

    const backendTest = new BackendCheck(ctx.res.locals.nonce.toString());
    const tenants = await backendTest.run();
    const tenant = tenants?.find((t) => new URL(t.location).hostname === ctx.request.headers.host)
      || tenants?.[0];

    result.push(await runTest(ctx, backendTest));
    result.push(await runTest(ctx, new HeadRequestCheck(ctx, tenant)));
    result.push(await runTest(ctx, new ManifestCheck(tenant)));
    result.push(await runTest(ctx, new FileCacheCheck(tenant)));
    result.push(await runTest(ctx, new MapTokenCheck()));

    if (result.find((r) => r.result === CheckResult.fail)) {
      ctx.response.status = HttpStatus.SERVICE_UNAVAILABLE;
    }

    if (ctx.request.get('Accept').includes('text/html')) {
      ctx.response.body = renderHtml(result);
    } else {
      ctx.response.body = renderMarkdown(result);
    }
  } catch (e) {
    ctx.response.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.response.body = e.toString();
  }
};
