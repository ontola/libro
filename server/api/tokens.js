export const userTokenRequest = (login, password, userToken, websiteIRI, r) => Object.freeze({
  body: {
    grant_type: 'password',
    password,
    r,
    scope: 'user',
    userToken,
    username: login,
  },
  path: new URL(`${websiteIRI}/spi/oauth/token`).pathname,
});
