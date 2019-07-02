/**
 * Middleware for AFE-ABE custom communications.
 * @see {../../server/api}
 * @module API
 */

import { createAction } from 'redux-actions';

import { setMapAccessToken } from '../async/MapView/actions';
import { safeCredentials } from '../helpers/arguHelpers';
import { handle } from '../helpers/logging';
import {
  AFE_API_GET_MAP_ACCESS_TOKEN,
  AFE_API_LOGIN,
  SIGN_IN_ACCOUNT_LOCKED,
  SIGN_IN_EMAIL_TAKEN,
  SIGN_IN_LOGGED_IN,
  SIGN_IN_UNKNOWN_EMAIL,
  SIGN_IN_USER_CREATED,
  SIGN_IN_WRONG_PASSWORD,
} from '../state/action-types';
import {
  accountLocked,
  emailTaken,
  unknownEmail,
  wrongPassword,
} from '../state/form/actions';

import { frontendIRI } from './app';
import { redirectPage, reloadPage } from './reloading';

export const apiLogin = createAction(AFE_API_LOGIN);

export default (history, swc) => () => next => (action) => {
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
        }).catch((e) => {
          handle(e);
          next(setMapAccessToken({
            accessToken: null,
            error: e,
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
            case SIGN_IN_ACCOUNT_LOCKED:
              next(accountLocked());
              break;
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
              try {
                swc.clearCache();
              } catch (e) {
                handle(e);
              }
              const { r } = action.payload;
              if (r && r.startsWith(frontendIRI.value)) {
                redirectPage(r);
              } else {
                history.goBack();
                reloadPage();
              }
              break;
            }
            default:
              throw new Error('Unknown user error occurred');
          }
        });
    }
    default: {
      handle(new Error(`Unknown client API action '${action.type}'`));
      return undefined;
    }
  }
};
