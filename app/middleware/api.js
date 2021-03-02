/**
 * Middleware for AFE-ABE custom communications.
 * @see {../../server/api}
 * @module API
 */

import { handle } from '../helpers/logging';
import { AFE_API_GET_MAP_ACCESS_TOKEN } from '../state/action-types';
import { setMapAccessToken } from '../state/MapView/actions';

export default () => () => (next) => (action) => {
  if (!action.type.startsWith('@AFE_API/')) {
    return next(action);
  }

  switch (action.type) {
  case AFE_API_GET_MAP_ACCESS_TOKEN: {
    return fetch('/api/maps/accessToken')
      .then((res) => res.json())
      .then((json) => {
        const expiry = Date.parse(json.expiresAt);

        next(setMapAccessToken({
          accessToken: json.accessToken,
          expiresAt: expiry,
        }));
      }).catch((e) => {
        handle(e);
        next(setMapAccessToken({
          accessToken: null,
          error: e,
        }));
      });
  }
  default: {
    handle(new Error(`Unknown client API action '${action.type}'`));

    return undefined;
  }
  }
};
