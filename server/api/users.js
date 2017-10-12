export const createUserRequest = email =>
  Object.freeze({
    body: {
      user: {
        email,
      },
    },
    path: 'users',
  });
