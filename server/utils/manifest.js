import fs from 'fs';

import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

import { bundleName } from '../config';
import processResponse from '../api/internal/statusHandler';
import { isSuccess } from '../../app/helpers/arguHelpers';

import { readFileFromCache } from './cache';

const getBackendManifestJSON = async (ctx, manifestLocation) => {
  const manifestFromCache = readFileFromCache(manifestLocation);
  if (manifestFromCache) {
    return JSON.parse(manifestFromCache);
  }

  const headerRes = await ctx.api.fetchRaw(
    ctx.api.userToken || ctx.api.serviceGuestToken,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...ctx.api.proxySafeHeaders(),
      },
      method: 'GET',
      path: manifestLocation,
      redirect: 'error',
    }
  );
  const processed = await processResponse(headerRes);
  const manifestData = await processed.json();

  return manifestData;
};

export const getBackendManifest = (ctx, manifestLocation) => {
  if (!manifestLocation) {
    if (isSuccess(ctx.response.status)) {
      ctx.response.status = INTERNAL_SERVER_ERROR;
      throw new Error('No Manifest url in head.');
    }

    return undefined;
  }

  return getBackendManifestJSON(ctx, manifestLocation);
};

function getManifest(build) {
  const manifest = {};

  let fileNames = {};
  if (__DEVELOPMENT__ || __TEST__) {
    [
      ['main.css', 'main.bundle.css'],
      ['main.js', 'main.bundle.js'],
      ['manifest.json', 'manifest.json'],
    ].forEach(([key, bundle]) => {
      Object.defineProperty(manifest, key, {
        get: () => `/${bundle}?q=${Math.random()}`,
      });
    });
  } else {
    const manifestFile = fs.readFileSync(`./dist/private/manifest.${bundleName}-${build}.json`);
    fileNames = JSON.parse(manifestFile);
  }

  const manifestTest = /manifest.[a-zA-Z0-9-]*.json/;
  Object.keys(fileNames).forEach((fileName) => {
    if (manifestTest.test(fileName)) {
      manifest['manifest.json'] = fileNames[fileName];
    }
    manifest[fileName] = fileNames[fileName];
  });

  return manifest;
}

export default {
  legacy: getManifest('legacy'),
  module: getManifest('module'),
};
