import { clientId, clientSecret } from '../config';

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
