import fs from 'fs';

import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

import { bundleName } from '../config';
import processResponse from '../api/internal/statusHandler';
import { isSuccess } from '../../app/helpers/arguHelpers';

import { readFileFromCache } from './cache';

export const requestBackendManifest = async (api, manifestLocation) => {
  const manifestFromCache = readFileFromCache(manifestLocation);
  if (manifestFromCache) {
    return JSON.parse(manifestFromCache);
  }

  return api.fetchRaw(
    api.userToken || api.serviceGuestToken,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...api.proxySafeHeaders(),
      },
      method: 'GET',
      path: manifestLocation,
      redirect: 'error',
    }
  );
};

export const getBackendManifest = async (ctx, manifestLocation) => {
  if (!manifestLocation) {
    if (isSuccess(ctx.response.status)) {
      ctx.response.status = INTERNAL_SERVER_ERROR;
      throw new Error('No Manifest url in head.');
    }

    return undefined;
  }

  const headerRes = await requestBackendManifest(ctx.api, manifestLocation);

  return processResponse(headerRes)?.json();
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
