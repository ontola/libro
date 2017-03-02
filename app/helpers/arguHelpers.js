import React from 'react';

import { FRONTEND_URL } from '../config';
/**
 * @module arguHelpers
 * @summary Helpers from the main Argu codebase, do not use these methods in new components.
 */

/**
 * @param {Object} props The props of the imageable element.
 * @returns {ReactElement|undefined} Proper image element.
 */
export function image(props) {
  if (props.image) {
    return <img src={props.image.url} alt={props.image.title} className={props.image.className} />;
  } else if (props.fa) {
    return <span className={['fa', props.fa].join(' ')} />;
  }
  return undefined;
}

image.propTypes = {
  fa: React.PropTypes.string,
  image: React.PropTypes.objectOf({
    className: React.PropTypes.string,
    title: React.PropTypes.string,
    url: React.PropTypes.string,
  }),
};

export function errorMessageForStatus(status) {
  if (status === 401) {
    return {
      type: 'alert',
      severity: 'error',
      i18nString: 'errors.status.401',
      fallback: 'Je moet ingelogd zijn voor deze actie.',
    };
  } else if (status === 404) {
    return {
      type: 'alert',
      severity: 'error',
      i18nString: 'errors.status.404',
      fallback: 'Het item is niet gevonden, probeer de pagina te verversen.',
    };
  } else if (status === 429) {
    return {
      type: 'alert',
      severity: 'error',
      i18nString: 'errors.status.429',
      fallback: 'Je maakt te veel verzoeken, probeer het over halve minuut nog eens.',
    };
  } else if (status === 500) {
    return {
      type: 'alert',
      severity: 'error',
      i18nString: 'errors.status.500',
      fallback: 'Er ging iets aan onze kant fout, probeer het later nog eens.',
    };
  } else if (status === 0) {
    return {
      type: 'none',
      severity: '',
      i18nString: undefined,
      fallback: '',
    };
  }
  return {
    type: 'none',
    severity: '',
    i18nString: undefined,
    fallback: undefined,
  };
}

export function json(response) {
  if (typeof response !== 'undefined' && response.status !== 204 && response.status !== 304) {
    return response.json();
  }
  return Promise.resolve();
}

export function getMetaContent(name) {
  const header = document.querySelector(`meta[name="${name}"]`);
  return header && header.content;
}

export function getAuthenticityToken() {
  return fetch(`${FRONTEND_URL}/csrfToken`, {
    method: 'POST',
    credentials: 'include',
    mode: 'same-origin',
  })
  .then(json)
  .then(jsonRes => jsonRes.csrfToken);
}

export function authenticityHeader(options) {
  return getAuthenticityToken()
  .then(token => Object.assign({}, options || {}, {
    'X-CSRF-Token': token,
    'X-Requested-With': 'XMLHttpRequest',
  }));
}

export function getUserIdentityToken() {
  return { token: getMetaContent('user-identity-token') };
}


/**
 * For use with window.fetch
 * @param {Object} options Object to be merged with jsonHeader options.
 * @returns {Object} The merged object.
 */
export function jsonHeader(options) {
  return Object.assign({}, options || {}, {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/json',
  });
}

/**
 * Lets fetch include credentials in the request. This includes cookies and other possibly sensitive
 * data.
 * Note: Never use for requests across (untrusted) domains.
 * @param {Object} options Object to be merged with safeCredentials options.
 * @returns {Object} The merged object.
 */
export function safeCredentials(options) {
  const opts = options || {};
  return authenticityHeader()
  .then(authHeader => Object.assign(
    {},
    {
      credentials: 'include',
      mode: 'same-origin',
      headers: Object.assign({}, authHeader, jsonHeader(), options.headers),
    },
    opts
  ));
}

export function statusSuccess(response) {
  if ((response.status >= 200 && response.status < 300) || response.status === 304) {
    return Promise.resolve(response);
  }
  return Promise.reject(response);
}

export function tryLogin(response) {
  if (response.status === 401) {
    /* eslint no-alert: 0 */
    if (window.confirm(errorMessageForStatus(response.status).fallback)) {
      window.location = `${window.location.origin}/u/sign_in?r=${encodeURIComponent(window.location.href)}`;
    } else {
      return Promise.reject(errorMessageForStatus(response.status).fallback);
    }
  }
  return Promise.reject(response);
}

export function userIdentityToken(options) {
  const opts = options || {};
  return Object.assign({}, opts, {
    body: JSON.stringify(Object.assign((opts.body || {}), getUserIdentityToken())),
  });
}
