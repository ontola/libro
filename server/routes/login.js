/* eslint-disable no-param-reassign */
import HttpStatus from 'http-status-codes';

import * as errors from '../utils/errors';

const MILLISECONDS = 1000;

async function login(ctx, next) {
  try {
    const response = await ctx.api.requestUserToken(
      ctx.request.body.email,
      ctx.request.body.password,
      ctx.request.headers['website-iri'],
      ctx.request.body.r
    );
    const json = await response.json();

    const expiresAt = new Date((json.created_at * MILLISECONDS) + (json.expires_in * MILLISECONDS));
    if (json.token_type === 'Bearer' && expiresAt > Date.now()) {
      ctx.session.arguToken = {
        accessToken: json.access_token,
        expiresAt,
        scope: json.scope,
      };
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
    const auth = response.headers.get('New-Authorization');
    if (ctx.session.arguToken) {
      ctx.session.arguToken.accessToken = auth;
    }
    ctx.api.userToken = auth;
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
