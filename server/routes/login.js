/* eslint-disable no-param-reassign */
import HttpStatus from 'http-status-codes';

import * as errors from '../utils/errors';
import { NEW_AUTHORIZATION_HEADER, NEW_REFRESH_TOKEN_HEADER } from '../utils/proxies/helpers';

async function login(ctx, next) {
  try {
    const response = await ctx.api.requestUserToken(
      ctx.request.body.email,
      ctx.request.body.password,
      ctx.request.headers['website-iri'],
      ctx.request.body.r
    );
    const json = await response.json();

    if (json.token_type === 'Bearer') {
      ctx.setAccessToken(json.access_token, json.refresh_token);
      ctx.body = { status: 'SIGN_IN_LOGGED_IN' };

      return;
    }
    throw new errors.NotImplementedError('Non-valid tokens have not been implemented yet.');
  } catch (e) {
    if (e && [errors.UnauthorizedError.status, errors.BadRequestError.status].includes(e.status)) {
      e.markAsSafe();
      if (!e.response || e.response.headers['Content-Type'] === 'application/json') {
        ctx.response.status = HttpStatus.INTERNAL_SERVER_ERROR;

        return;
      }

      const json = await e.response.json();
      if (!json) {
        ctx.response.status = HttpStatus.INTERNAL_SERVER_ERROR;

        return;
      }

      switch (json.code) {
        case 'ACCOUNT_LOCKED':
          ctx.response.body = { status: 'SIGN_IN_ACCOUNT_LOCKED' };
          break;
        case 'WRONG_PASSWORD':
          ctx.response.body = { status: 'SIGN_IN_WRONG_PASSWORD' };
          break;
        case 'NO_PASSWORD':
          ctx.response.body = { status: 'SIGN_IN_NO_PASSWORD' };
          break;
        case 'UNKNOWN_EMAIL':
          ctx.response.body = { status: 'SIGN_IN_UNKNOWN_EMAIL' };
          break;
        case 'UNKNOWN_USERNAME':
          ctx.response.body = json;
          break;
        default:
          throw new Error('Unknown response 422 from backend');
      }

      return;
    }
    next(e);
  }
}

async function signUp(ctx, next) {
  try {
    const response = await ctx.api.createUser(
      ctx.request.body.email,
      ctx.request.body.acceptTerms,
      ctx.request.headers['website-iri']
    );

    if (response.status !== HttpStatus.CREATED) {
      throw new errors.NotImplementedError('Only the error-free login flow has been implemented');
    }
    ctx.response.status = response.status;
    const json = await response.json();
    const auth = response.headers.get(NEW_AUTHORIZATION_HEADER);
    const refreshToken = response.headers.get(NEW_REFRESH_TOKEN_HEADER);
    ctx.setAccessToken(auth, refreshToken);
    ctx.response.body = {
      email: json.data.attributes.email,
      status: 'SIGN_IN_USER_CREATED',
    };
  } catch (e) {
    switch (e.constructor) {
      case errors.UnprocessableEntityError:
        ctx.response.body = { status: 'SIGN_IN_EMAIL_TAKEN' };
        break;
      default:
        next(new errors.NotImplementedError('Only the error-free login flow has been implemented'));
    }
  }
}

export default (ctx, next) => {
  ctx.response.set('Vary', 'Accept,Accept-Encoding,Content-Type');
  if (typeof ctx.request.body.acceptTerms === 'undefined') {
    return login(ctx, next);
  }

  return signUp(ctx, next);
};
