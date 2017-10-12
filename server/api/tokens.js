
export const guestTokenRequest = Object.freeze({
  body: { scope: 'guest' },
  path: 'spi/oauth/token',
});

export const userTokenRequest = (login, password) =>
  Object.freeze({
    body: {
      password,
      scope: 'user',
      username: login,
    },
    path: 'spi/oauth/token'
  });
