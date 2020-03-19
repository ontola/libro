import { clientId, clientSecret } from '../config';

export const guestTokenRequest = (websiteIRI) => Object.freeze({
  body: {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'password',
    scope: 'guest',
  },
  path: new URL(`${websiteIRI}/oauth/token`).pathname,
});

export const refreshTokenRequest = (refreshToken, websiteIRI) => Object.freeze({
  body: {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  },
  path: new URL(`${websiteIRI}/oauth/token`).pathname,
});

export const userTokenRequest = (login, password, websiteIRI, r) => Object.freeze({
  body: {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'password',
    password,
    r,
    scope: 'user',
    username: login,
  },
  path: new URL(`${websiteIRI}/oauth/token`).pathname,
});
