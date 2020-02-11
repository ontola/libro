import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../../../app/App';
import generateLRS from '../../../app/helpers/generateLRS';
import logging from '../logging';

// eslint-disable-next-line import/prefer-default-export
export const headersFromPrerender = async (ctx, data) => {
  try {
    const seedRequest = {
      body: data?.toString('utf-8') ?? '',
      headers: { 'Content-Type': 'application/hex+x-ndjson' },
      status: 200,
    };

    const { LRS } = generateLRS();
    await LRS.api.feedResponse(seedRequest, true);

    const helmetContext = {};

    const { origin } = new URL(ctx.manifest.scope || `${ctx.req.host}://${ctx.req.protocol}`);
    const resourceIRI = ctx.req.url?.length > 1 ? origin + ctx.req.url : origin;

    ReactDOMServer.renderToStaticMarkup(React.createElement(
      App,
      {
        helmetContext,
        location: resourceIRI,
        lrs: LRS,
        website: ctx.manifest.scope,
      }
    ));

    return helmetContext.helmet;
  } catch (e) {
    logging.error(e);

    return {};
  }
};
