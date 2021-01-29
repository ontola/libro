import fs from 'fs';
import path from 'path';

import HttpStatus from 'http-status-codes';

import logging from '../utils/logging';

// TODO: replace with self.__WB_MANIFEST
const PREFIX = 'self.__WB_MANIFEST = (self.__WB_MANIFEST || []).concat(';
const SUFFIX = ');';

const precacheManifest = async (ctx) => {
  try {
    const [url, params] = ctx.request.originalUrl.split('?');

    const manifestFile = fs
      .readFileSync(path.resolve('dist', 'f_assets', url.split('/').pop()))
      .toString();

    const manifest = JSON.parse(
      manifestFile.substring(PREFIX.length, manifestFile.length - SUFFIX.length)
    );
    const manifestLocation = new URLSearchParams(params).get('manifestLocation');
    const manifestData = await ctx.getManifest(manifestLocation);

    if (manifestData) {
      manifest.push(({ url: manifestLocation }));
      manifest.push(...manifestData.icons.map((icon) => ({ url: icon.src })));

      ctx.response.set('Content-Type', 'application/javascript');
      ctx.response.body = PREFIX + JSON.stringify(manifest, null, 1) + SUFFIX;
      ctx.response.status = HttpStatus.OK;
    }
  } catch (e) {
    logging.error(e);
    ctx.response.status = HttpStatus.INTERNAL_SERVER_ERROR;
  }
};

export default precacheManifest;
