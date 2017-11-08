/* eslint-disable no-param-reassign */

import * as errors from '../utils/errors';

const MILLISECONDS = 1000;

async function login(req, res, next) {
  try {
    const response = await req.api.requestUserToken(req.body.email, req.body.password);
    const json = await response.json();

    const expiresAt = new Date((json.created_at * MILLISECONDS) + (json.expires_in * MILLISECONDS));
    if (json.token_type === 'bearer' && expiresAt > Date.now()) {
      req.session.arguToken = {
        accessToken: json.access_token,
        expiresAt,
        scope: json.scope,
      };
      res.send({ status: 'LOGGED_IN' }).end();
      return;
    }
    throw new errors.NotImplementedError('Non-valid tokens have not been implemented yet.');
  } catch (e) {
    if (e.status === errors.UnprocessableEntityError.status) {
      const json = await e.response.json();
      switch (json.code) {
        case 'WRONG_PASSWORD':
          res.send(json).end();
          break;
        case 'UNKNOWN_EMAIL':
          res.send(json).end();
          break;
        case 'UNKNOWN_USERNAME':
          res.send(json).end();
          break;
        default:
          throw new Error('Unknown response 422 from backend');
      }
      return;
    }
    next(e);
  }
}

async function signUp(req, res, next) {
  try {
    await req.api.createUser(req.body.email);
    throw new errors.NotImplementedError('Only the error-free login flow has been implemented');
  } catch (e) {
    switch (e.constructor) {
      case errors.UnprocessableEntityError:
        res.send({ status: 'EMAIL_TAKEN' });
        res.end();
        break;
      default:
        next(new errors.NotImplementedError('Only the error-free login flow has been implemented'));
    }
  }
}

export default (req, res, next) => {
  if (req.body.password) {
    return login(req, res, next);
  }
  return signUp(req, res, next);
};
