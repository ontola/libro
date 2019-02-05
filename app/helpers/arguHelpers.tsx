import HttpStatus from 'http-status-codes';
import PropTypes from 'prop-types';
import React from 'react';
import {NS} from './LinkedRenderStore';
/**
 * @module arguHelpers
 * @summary Helpers from the main Argu codebase, do not use these methods in new components.
 */

/**
 * @param {Object} props The props of the imageable element.
 * @returns {ReactElement|undefined} Proper image element.
 */
export function image(props: any) {
  if (props.image) {
    return <img alt={props.image.title} className={props.image.className} src={props.image.url} />;
  } else if (props.fa) {
    return <span className={['fa', props.fa].join(' ')} />;
  }
  return undefined;
}

image.propTypes = {
  fa: PropTypes.string,
  image: PropTypes.shape({
    className: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
  }),
};

export function errorMessageForStatus(status: number) {
  if (status === HttpStatus.UNAUTHORIZED) {
    return {
      fallback: 'Je moet ingelogd zijn voor deze actie.',
      i18nString: 'errors.status.401',
      severity: 'error',
      type: 'alert',
    };
  } else if (status === HttpStatus.NOT_FOUND) {
    return {
      fallback: 'Het item is niet gevonden, probeer de pagina te verversen.',
      i18nString: 'errors.status.404',
      severity: 'error',
      type: 'alert',
    };
  } else if (status === HttpStatus.TOO_MANY_REQUESTS) {
    return {
      fallback: 'Je maakt te veel verzoeken, probeer het over halve minuut nog eens.',
      i18nString: 'errors.status.429',
      severity: 'error',
      type: 'alert',
    };
  } else if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
    return {
      fallback: 'Er ging iets aan onze kant fout, probeer het later nog eens.',
      i18nString: 'errors.status.500',
      severity: 'error',
      type: 'alert',
    };
  } else if (status === 0) {
    return {
      fallback: '',
      i18nString: undefined,
      severity: '',
      type: 'none',
    };
  }
  return {
    fallback: undefined,
    i18nString: undefined,
    severity: '',
    type: 'none',
  };
}

export function json(response: Response) {
  if (typeof response !== 'undefined'
      && response.status !== HttpStatus.NO_CONTENT
      && response.status !== HttpStatus.NOT_MODIFIED) {
    return response.json();
  }
  return Promise.resolve();
}

export function getMetaContent(name: string) {
  const header = __CLIENT__
    ? document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
    : undefined;
  return header && header.content;
}

export function getAuthenticityToken() {
  return getMetaContent('csrf-token');
}

export function authenticityHeader(options?: object) {
  return Object.assign({}, options || {}, {
    'X-CSRF-Token': getAuthenticityToken(),
    'X-Requested-With': 'XMLHttpRequest',
  });
}

/**
 * For use with window.fetch
 * @param {Object} options Object to be merged with jsonHeader options.
 * @returns {Object} The merged object.
 */
export function jsonHeader(options?: object) {
  return Object.assign({}, options || {}, {
    'Accept': 'application/vnd.api+json',
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
export function safeCredentials(options: any = {}) {
  return Object.assign({}, options, {
    credentials: 'include',
    headers: Object.assign({}, authenticityHeader(), jsonHeader(), options.headers),
    mode: 'same-origin',
  });
}

export function statusSuccess(response: Response) {
  if ((response.status >= HttpStatus.OK
      && response.status < HttpStatus.MULTIPLE_CHOICES)
      || response.status === HttpStatus.NOT_MODIFIED) {
    return Promise.resolve(response);
  }
  return Promise.reject(response);
}

export function tryLogin(response: Response) {
  if (response.status === HttpStatus.UNAUTHORIZED) {
    /* eslint no-alert: 0 */
    if (window.confirm(errorMessageForStatus(response.status).fallback)) {
      window.location.href = NS.app(`u/sign_in?r=${encodeURIComponent(window.location.href)}`).value;
    } else {
      return Promise.reject(errorMessageForStatus(response.status).fallback);
    }
  }
  return Promise.reject(response);
}
