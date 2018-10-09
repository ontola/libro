import fetch from 'isomorphic-fetch';

import * as constants from '../app/config';

import { createUserRequest } from './api/users';
import processResponse from './api/internal/statusHandler';
import { guestTokenRequest, userTokenRequest } from './api/tokens';
import { oAuthToken } from './config';

/**
 * Class for communicating with the Argu API & SPI.
 */
class API {
  constructor({ req, userToken }) {
    this.base = constants.ARGU_API_URL;
    this.req = req;
    this.serviceToken = oAuthToken;
    this.userToken = userToken;
  }

  proxySafeHeaders(req = this.req) {
    return {
      'Accept-Language': req.headers['accept-language'],
    };
  }

  /**
   * Create a new user.
   * @param {String} email The email address of the user
   * @param {Boolean} acceptTerms Whether the user has agreed with the terms
   * @return {Promise} Raw fetch response promise
   */
  createUser(email, acceptTerms) {
    return this.fetch(this.userToken, createUserRequest(email, acceptTerms));
  }

  /**
   * Make a request with the HEAD method
   * @param {Request} req The request to forward
   * @return {Promise} The proxies response
   */
  headRequest(req) {
    return this.fetchRaw(this.userToken, {
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
   * Request a new guest token from the backend
   * @return {Promise} Raw fetch response promise
   */
  requestGuestToken() {
    return this.fetch(this.serviceToken, guestTokenRequest);
  }

  /**
   * Request a new access token from login credentials
   * @param {String} login The users' email or username.
   * @param {String} password The users' password.
   * @return {Promise} The raw fetch response promise
   */
  requestUserToken(login, password) {
    return this.fetch(this.serviceToken, userTokenRequest(login, password));
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

    return fetch(
      new URL(path, this.base).toString(),
      {
        ...rest,
        headers: {
          ...headers,
          Authorization: `Bearer ${authToken}`,
          'X-Argu-Back': 'true',
        },
        strictSSL: !__DEVELOPMENT__,
      }
    );
  }
}

export default API;
