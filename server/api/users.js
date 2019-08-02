export const createUserRequest = (email, acceptTerms, websiteIRI) => Object.freeze({
  body: {
    accept_terms: !!acceptTerms,
    user: {
      email,
    },
  },
  path: new URL(`${websiteIRI}/users`).pathname,
});

export default createUserRequest;
