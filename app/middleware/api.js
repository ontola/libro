/**
 * Middleware for AFE-ABE custom communications.
 * @see {../../server/api}
 * @module API
 */

import { setMapAccessToken } from '../async/MapView/actions';
import { handle } from '../helpers/logging';
import {
  AFE_API_GET_ASSET,
  AFE_API_GET_MAP_ACCESS_TOKEN,
} from '../state/action-types';
import { storeAsset } from '../state/assets/actions';

export default () => () => (next) => (action) => {
  if (!action.type.startsWith('@AFE_API/')) {
    return next(action);
  }

  switch (action.type) {
    case AFE_API_GET_ASSET: {
      return fetch(action.payload.file)
        .then((res) => res.json())
        .then((json) => {
          next(storeAsset(action.payload.file, json));
        }).catch((e) => {
          handle(e);
        });
    }
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
