/* eslint-disable no-param-reassign */
import HttpStatus from 'http-status-codes';

import * as errors from '../utils/errors';

const MILLISECONDS = 1000;

async function login(req, res, next) {
  try {
    const response = await req.api.requestUserToken(req.body.email, req.body.password);
    const json = await response.json();

    const expiresAt = new Date((json.created_at * MILLISECONDS) + (json.expires_in * MILLISECONDS));
    if (json.token_type === 'Bearer' && expiresAt > Date.now()) {
      req.session.arguToken = {
        accessToken: json.access_token,
        expiresAt,
        scope: json.scope,
      };
      res.send({ status: 'SIGN_IN_LOGGED_IN' }).end();
      return;
    }
    throw new errors.NotImplementedError('Non-valid tokens have not been implemented yet.');
  } catch (e) {
    if (e && e.status === errors.UnprocessableEntityError.status) {
      e.markAsSafe();
      if (!e.response || e.response.headers['Content-Type'] === 'application/json') {
        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR).end();
        return;
      }

      const json = await e.response.json();
      if (!json) {
        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR).end();
        return;
      }

      switch (json.code) {
        case 'WRONG_PASSWORD':
          res.send({ status: 'SIGN_IN_WRONG_PASSWORD' }).end();
          break;
        case 'UNKNOWN_EMAIL':
          res.send({ status: 'SIGN_IN_UNKNOWN_EMAIL' }).end();
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
    const response = await req.api.createUser(req.body.email, req.body.acceptTerms);

    if (response.status !== HttpStatus.CREATED) {
      throw new errors.NotImplementedError('Only the error-free login flow has been implemented');
    }
    res.status = response.status;
    const json = await response.json();
    const auth = response.headers.get('New-Authorization');
    req.session.arguToken.accessToken = auth;
    req.api.userToken = auth;
    res.send({
      email: json.data.attributes.email,
      status: 'SIGN_IN_USER_CREATED',
    });
  } catch (e) {
    switch (e.constructor) {
      case errors.UnprocessableEntityError:
        res.send({ status: 'SIGN_IN_EMAIL_TAKEN' });
        res.end();
        break;
      default:
        next(new errors.NotImplementedError('Only the error-free login flow has been implemented'));
    }
  }
}

export default (req, res, next) => {
  res.setHeader('Vary', 'Accept,Accept-Encoding,Content-Type');
  if (typeof req.body.acceptTerms === 'undefined') {
    return login(req, res, next);
  }
  return signUp(req, res, next);
};
