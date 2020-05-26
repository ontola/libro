import fetch from 'isomorphic-fetch';

import * as constants from '../app/config';

import { createUserRequest } from './api/users';
import processResponse from './api/internal/statusHandler';
import {
  guestTokenRequest,
  refreshTokenRequest,
  userTokenRequest,
} from './api/tokens';
import {
  clientId,
  clientSecret,
  oAuthToken,
} from './config';
import logging from './utils/logging';
import { route } from './utils/proxies/helpers';

/**
 * Class for communicating with the Argu API & SPI.
 */
class API {
  constructor(ctx) {
    this.base = constants.ARGU_API_URL;
    this.ctx = ctx;
    this.serviceToken = oAuthToken;
  }

  logout(websiteIRI) {
    return this.fetchRaw(this.ctx.session.userToken, {
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        token: this.ctx.session.userToken,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...this.proxySafeHeaders(this.ctx.request),
      },
      method: 'POST',
      path: new URL(`${websiteIRI}/oauth/revoke`).pathname,
      redirect: 'manual',
    });
  }

  proxySafeHeaders(req = this.ctx.request) {
    return {
      'Accept-Language': req.headers?.['accept-language'],
      'X-Forwarded-Host': req.headers.host,
      'X-Forwarded-Proto': 'https',
      'X-Forwarded-Ssl': 'on',
    };
  }

  async tenants() {
    const res = await this.fetchRaw(
      this.serviceToken,
      {
        headers: {
          Accept: 'application/json',
        },
        path: '/_public/spi/tenants',
      }
    );

    try {
      return await res.clone().json();
    } catch (e) {
      e.response = res;
      throw e;
    }
  }

  /**
   * Create a new user.
   * @param {String} email The email address of the user
   * @param {Boolean} acceptTerms Whether the user has agreed with the terms
   * @param {String} websiteIRI
   * @return {Promise} Raw fetch response promise
   */
  createUser(email, acceptTerms, websiteIRI) {
    return this.fetch(
      this.ctx.session.userToken,
      createUserRequest(email, acceptTerms, websiteIRI)
    );
  }

  /**
   * Make a request with the HEAD method
   * @param {Request} req The request to forward
   * @return {Promise} The proxies response
   */
  headRequest(req) {
    return this.fetchRaw(this.ctx.session.userToken, {
      headers: {
        Accept: constants.FRONTEND_ACCEPT,
        ...this.proxySafeHeaders(req),
      },
      method: 'HEAD',
      path: req.url,
      redirect: 'manual',
    });
  }

  refreshToken(refreshToken, websiteIRI) {
    return this.fetch(
      this.ctx.session.userToken,
      refreshTokenRequest(refreshToken, websiteIRI)
    );
  }

  /**
   * Request a new guest token from the backend
   * @return {Promise} Raw fetch response promise
   */
  requestGuestToken(websiteIRI) {
    return this.fetch(this.serviceToken, guestTokenRequest(websiteIRI));
  }

  /**
   * Request a new access token from login credentials
   * @param {String} login The users' email or username.
   * @param {String} password The users' password.
   * @param {String} websiteIRI.
   * @param {String} redirect URL of the resource the user was working with before loggin in.
   * @return {Promise} The raw fetch response promise
   */
  requestUserToken(login, password, websiteIRI, redirect = undefined) {
    return this.fetch(
      this.ctx.session.userToken,
      userTokenRequest(login, password, websiteIRI, redirect)
    );
  }

  /**
   * Makes network calls
   * @private
   * @param {String} authToken WARNING: USING THE SERVICE TOKEN FOR THE WRONG REQUEST WILL LEAD TO
   * DISASTROUS RESULTS.
   * @param {String} path The API path.
   * @param {Object} body The API request body.
   * @return {Promise} The raw fetch promise.
   */
  fetch(authToken, { path, body }) {
    return this.fetchRaw(
      authToken,
      {
        body: JSON.stringify(body),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...this.proxySafeHeaders(),
        },
        method: 'POST',
        path,
        redirect: 'error',
      }
    ).then(processResponse);
  }

  fetchRaw(authToken, { path, ...opts }) {
    const { headers, ...rest } = opts;
    const routed = route(new URL(path, this.base).toString(), true);
    logging.debug(`[API] Request '${path}', routed: ${routed}`);

    return fetch(
      routed,
      {
        ...rest,
        headers: {
          ...headers,
          Authorization: `Bearer ${authToken}`,
          'X-Argu-Back': 'true',
          'X-Device-Id': this.ctx.deviceId,
        },
        strictSSL: !__DEVELOPMENT__,
      }
    );
  }
}

export default API;
