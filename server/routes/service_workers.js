import fs from 'fs';
import path from 'path';

import HttpStatus from 'http-status-codes';

import logging from '../utils/logging';

const serviceWorker = async (ctx) => {
  try {
    const [url, params] = ctx.request.originalUrl.split('?');

    const serviceWorkerFile = fs
      .readFileSync(path.resolve('dist', 'public', url.split('/').pop()))
      .toString();

    ctx.response.set('Content-Type', 'application/javascript');
    ctx.response.body = serviceWorkerFile
      .replace(/f_assets\/precache-manifest\.[0-9a-z]+.js/gi, x => [x, params].join('?'));
    ctx.response.status = HttpStatus.OK;
  } catch (e) {
    logging.error(e);
    ctx.response.status = HttpStatus.INTERNAL_SERVER_ERROR;
  }
};

export default serviceWorker;
