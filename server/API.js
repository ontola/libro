import fetch from 'isomorphic-fetch';

import { createUserRequest } from './api/users';
import processResponse from './api/internal/statusHandler';
import { guestTokenRequest, userTokenRequest } from './api/tokens';
import { ARGU_API_URL } from './config';

const oAuthToken = process.env.RAILS_OAUTH_TOKEN;

if (!oAuthToken) {
  console.error('NO OAUTH TOKEN');
  process.exit(1);
}

/**
 * Class for communicating with the Argu API & SPI.
 */
class API {
  constructor() {
    this.base = ARGU_API_URL;
    this.token = oAuthToken;
  }

  /**
   * Create a new user.
   * @param {String} email The email address of the user
   * @return {Promise} Raw fetch response promise
   */
  createUser(email) {
    return this.fetch(createUserRequest(email));
  }

  /**
   * Request a new guest token from the backend
   * @return {Promise} Raw fetch response promise
   */
  requestGuestToken() {
    return this.fetch(guestTokenRequest);
  }

  /**
   * Request a new access token from login credentials
   * @param {String} login The users' email or username.
   * @param {String} password The users' password.
   * @return {Promise} The raw fetch response promise
   */
  requestUserToken(login, password) {
    return this.fetch(userTokenRequest(login, password));
  }

  /**
   * Makes network calls
   * @private
   * @param {String} path The API path.
   * @param {Object} body The API request body.
   * @return {Promise} The raw fetch promise.
   */
  fetch({ path, body }) {
    return fetch(
      [this.base, path].join('/'),
      {
        body: JSON.stringify(body),
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        redirect: 'error',
        strictSSL: process.env.NODE_ENV !== 'development',
      }
    ).then(processResponse);
  }
}

export default API;
