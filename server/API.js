import fetch from 'isomorphic-fetch';

import * as constants from '../app/config';

import { createUserRequest } from './api/users';
import processResponse from './api/internal/statusHandler';
import { userTokenRequest } from './api/tokens';
import {
  clientId,
  clientSecret,
  oAuthToken,
  serviceGuestToken,
} from './config';
import logging from './utils/logging';
import { route } from './utils/proxies/helpers';

/**
 * Class for communicating with the Argu API & SPI.
 */
class API {
  constructor({ req, userToken }) {
    this.base = constants.ARGU_API_URL;
    this.deviceId = req.deviceId;
    this.req = req;
    this.serviceToken = oAuthToken;
    this.serviceGuestToken = serviceGuestToken;
    this.userToken = userToken;
  }

  logout(req = this.req) {
    return this.fetchRaw(this.userToken, {
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        token: this.userToken,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...this.proxySafeHeaders(req),
      },
      method: 'POST',
      path: 'spi/oauth/revoke',
      redirect: 'manual',
    });
  }

  proxySafeHeaders(req = this.req) {
    return {
      'Accept-Language': req.headers?.['accept-language'],
      'X-Forwarded-Host': req.headers.host,
      'X-Forwarded-Proto': 'https',
      'X-Forwarded-Ssl': 'on',
    };
  }

  /**
   * Create a new user.
   * @param {String} email The email address of the user
   * @param {Boolean} acceptTerms Whether the user has agreed with the terms
   * @param {String} websiteIRI
   * @return {Promise} Raw fetch response promise
   */
  createUser(email, acceptTerms, websiteIRI) {
    return this.fetch(this.userToken, createUserRequest(email, acceptTerms, websiteIRI));
  }

  /**
   * Make a request with the HEAD method
   * @param {Request} req The request to forward
   * @return {Promise} The proxies response
   */
  headRequest(req) {
    return this.fetchRaw(this.userToken || this.serviceGuestToken, {
      headers: {
        Accept: constants.FRONTEND_ACCEPT,
        ...this.proxySafeHeaders(req),
      },
      method: 'HEAD',
      path: req.url,
      redirect: 'manual',
    });
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
      this.serviceToken,
      userTokenRequest(login, password, this.userToken, websiteIRI, redirect)
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

    logging.debug(`[API] Request '${path}'`);

    return fetch(
      route(new URL(path, this.base).toString(), true),
      {
        ...rest,
        headers: {
          ...headers,
          Authorization: `Bearer ${authToken}`,
          'X-Argu-Back': 'true',
          'X-Device-Id': this.deviceId,
        },
        strictSSL: !__DEVELOPMENT__,
      }
    );
  }
}

export default API;
