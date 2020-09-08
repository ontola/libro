import HttpStatus from 'http-status-codes';
import fetch from 'isomorphic-fetch';

import { mapboxKey, mapboxUsername } from '../config';
import handleAsyncErrors from '../utils/handleAsyncErrors';

const keyReqURL = `https://api.mapbox.com/tokens/v2/${mapboxUsername}?access_token=${mapboxKey}`;
const scopes = ['styles:tiles', 'styles:read', 'fonts:read', 'datasets:read'];

const ONE_HOUR_MS = 3600000;

function oneHourFromNow() {
  return new Date(Date.now() + ONE_HOUR_MS).toISOString();
}

export async function makeTokenRequest(expiresAt) {
  const resp = await fetch(keyReqURL, {
    body: JSON.stringify({
      expires: expiresAt,
      scopes,
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  });

  if (resp.status !== HttpStatus.CREATED) {
    throw new Error(`Could not get access token from map provider (status ${resp.status})`);
  }

  return resp.json();
}

export async function createToken() {
  const expiresAt = oneHourFromNow();

  const body = await makeTokenRequest(expiresAt);
  const accessToken = body?.token;

  if (!accessToken.startsWith('tk.')) {
    throw new Error('Map access token undefined or not temporary');
  }

  return [expiresAt, accessToken];
}

const MapsAPI = async (ctx) => {
  const [expiresAt, accessToken] = await createToken();

  ctx.response.status = HttpStatus.OK;
  ctx.response.body = {
    accessToken,
    expiresAt,
  };
};

export default handleAsyncErrors(MapsAPI);
