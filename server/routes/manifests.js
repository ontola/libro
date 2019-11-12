import fs from 'fs';
import path from 'path';

import HttpStatus from 'http-status-codes';
import fetch from 'isomorphic-fetch';

import processResponse from '../api/internal/statusHandler';
import logging from '../utils/logging';
import { route } from '../utils/proxies/helpers';


const PREFIX = 'self.__precacheManifest = (self.__precacheManifest || []).concat(';
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

    const manifestReq = await fetch(
      route(manifestLocation, true),
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Forwarded-Host': ctx.request.headers.host,
          'X-Forwarded-Proto': 'https',
          'X-Forwarded-Ssl': 'on',
        },
        method: 'GET',
        redirect: 'error',
        strictSSL: process.env.NODE_ENV !== 'development',
      }
    );

    const manifestRes = await processResponse(manifestReq);
    const manifestData = await manifestRes.json();
    manifest.push(({ url: manifestLocation }));
    manifest.push(...manifestData.icons.map(icon => ({ url: icon.src })));

    ctx.response.set('Content-Type', 'application/javascript');
    ctx.response.body = PREFIX + JSON.stringify(manifest, null, 1) + SUFFIX;
    ctx.response.status = HttpStatus.OK;
  } catch (e) {
    logging.error(e);
    ctx.response.status = HttpStatus.INTERNAL_SERVER_ERROR;
  }
};

export default precacheManifest;
