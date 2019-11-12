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

const MapsAPI = async (ctx) => {
  const expiresAt = oneHourFromNow();

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

  const body = await resp.json();
  const token = body && body.token;

  if (typeof token !== 'string' || !token.startsWith('tk.')) {
    throw new Error('Map access token undefined or not temporary');
  }

  ctx.response.status = HttpStatus.OK;
  ctx.response.body = {
    accessToken: body.token,
    expiresAt,
  };
};

export default handleAsyncErrors(MapsAPI);
