import fetch from 'isomorphic-fetch';

import * as constants from '../app/config';

import processResponse from './api/internal/statusHandler';
import {
  guestTokenRequest,
  refreshTokenRequest,
} from './api/tokens';
import {
  backendApiUrl,
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
  constructor(ctx) {
    this.base = backendApiUrl;
    this.ctx = ctx;
    this.serviceToken = oAuthToken;
    this.serviceGuestToken = serviceGuestToken;
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
   * Make a request with the HEAD method
   * @param {Request} req The request to forward
   * @return {Promise} The proxies response
   */
  headRequest(req) {
    return this.fetchRaw(this.ctx.session?.userToken || this.serviceGuestToken, {
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
