
export const guestTokenRequest = Object.freeze({
  body: { scope: 'guest' },
  path: 'spi/oauth/token',
});

export const userTokenRequest = (login, password, userToken, r) => Object.freeze({
  body: {
    password,
    r,
    scope: 'user',
    userToken,
    username: login,
  },
  path: 'spi/oauth/token',
});
