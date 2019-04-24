import * as config from '../config';

export const guestTokenRequest = Object.freeze({
  body: {
    client_id: config.clientId,
    client_secret: config.clientSecret,
    grant_type: 'client_credentials',
    scope: 'guest',
  },
  path: 'spi/oauth/token',
});

export const userTokenRequest = (login, password, userToken, r) => Object.freeze({
  body: {
    grant_type: 'password',
    password,
    r,
    scope: 'user',
    userToken,
    username: login,
  },
  path: 'spi/oauth/token',
});
