/**
 * Middleware for AFE-ABE custom communications.
 * @see {../../server/api}
 * @module API
 */

import { goBack, push } from 'connected-react-router';
import { createAction } from 'redux-actions';

import { setMapAccessToken } from '../async/MapView/actions';
import { FRONTEND_URL } from '../config';
import { safeCredentials } from '../helpers/arguHelpers';
import serviceWorkerCommunicator from '../helpers/serviceWorkerCommunicator';
import {
  AFE_API_GET_MAP_ACCESS_TOKEN,
  AFE_API_LOGIN,
  SIGN_IN_EMAIL_TAKEN,
  SIGN_IN_LOGGED_IN,
  SIGN_IN_UNKNOWN_EMAIL,
  SIGN_IN_USER_CREATED,
  SIGN_IN_WRONG_PASSWORD,
} from '../state/action-types';
import {
  emailTaken,
  unknownEmail,
  wrongPassword,
} from '../state/form/actions';

const PATH_MATCH = 1;

export const apiLogin = createAction(AFE_API_LOGIN);

export default () => next => (action) => {
  if (!action.type.startsWith('@AFE_API/')) {
    return next(action);
  }

  switch (action.type) {
    case AFE_API_GET_MAP_ACCESS_TOKEN: {
      return fetch('/api/maps/accessToken')
        .then(res => res.json())
        .then((json) => {
          const expiry = Date.parse(json.expiresAt);

          next(setMapAccessToken({
            accessToken: json.accessToken,
            expiresAt: expiry,
          }));
        });
    }
    case AFE_API_LOGIN: {
      return fetch('/login', safeCredentials({
        body: JSON.stringify(action.payload),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        redirect: 'manual',
      }))
        .then(res => res.json())
        .then((json) => {
          switch (json.status) {
            case SIGN_IN_UNKNOWN_EMAIL:
              next(unknownEmail());
              break;
            case SIGN_IN_EMAIL_TAKEN:
              next(emailTaken());
              break;
            case SIGN_IN_WRONG_PASSWORD:
              next(wrongPassword());
              break;
            case SIGN_IN_USER_CREATED:
            case SIGN_IN_LOGGED_IN: {
              let match;
              serviceWorkerCommunicator.clearCache();
              const { r } = action.payload;
              if (r && r.startsWith(FRONTEND_URL)) {
                match = r.split(FRONTEND_URL);
                const redirect = (match && match[PATH_MATCH]) || '/';
                next(push(redirect));
              } else {
                next(goBack());
              }
              window.location.reload();
              break;
            }
            default:
              throw new Error('Unknown user error occurred');
          }
        });
    }
    default: {
      // TODO: bugsnag
      return undefined;
    }
  }
};
