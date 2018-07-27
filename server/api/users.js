export const createUserRequest = (email, acceptTerms) => Object.freeze({
  body: {
    accept_terms: !!acceptTerms,
    user: {
      email,
    },
  },
  path: 'users',
});

export default createUserRequest;
