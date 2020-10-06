const createDataContext = (ctx) => {
  const dataHeaders = {
    ...ctx.request.headers,
    accept: 'application/hex+x-ndjson',
  };

  return {
    addAction: ctx.addAction,
    api: ctx.api,
    deviceId: ctx.deviceId,
    getFromAccessToken: ctx.getFromAccessToken,
    getFromAccessTokenRaw: ctx.getFromAccessTokenRaw,
    getManifest: ctx.getManifest,
    headResponse: ctx.headResponse,
    manifest: ctx.manifest,
    req: {
      getCtx: () => ctx,
    },
    request: {
      get: () => {},
      headers: dataHeaders,
      origin: ctx.request.origin,
    },
    session: ctx.session,
    setAccessToken: ctx.setAccessToken,
  };
};

export default createDataContext;
