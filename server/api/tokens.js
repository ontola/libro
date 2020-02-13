export const userTokenRequest = (login, password, websiteIRI, r) => Object.freeze({
  body: {
    grant_type: 'password',
    password,
    r,
    scope: 'user',
    username: login,
  },
  path: new URL(`${websiteIRI}/oauth/token`).pathname,
});
