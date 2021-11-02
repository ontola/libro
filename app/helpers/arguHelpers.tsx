import HttpStatus from 'http-status-codes';
import React from 'react';

/**
 * @module arguHelpers
 * @summary Helpers from the main Argu codebase, do not use these methods in new components.
 */

/**
 * @param {Object} props The props of the imageable element.
 * @returns {ReactElement|undefined} Proper image element.
 */

 interface ImageProps {
  fa?: string,
  image?: {
    className: string,
    title: string,
    url: string,
  },
 }

export const image = (props: ImageProps): JSX.Element | undefined => {
  if (props.image) {
    return (
      <img
        alt={props.image.title}
        className={props.image.className}
        src={props.image.url}
      />
    );
  } else if (props.fa) {
    return <span className={['fa', props.fa].join(' ')} />;
  }

  return undefined;
};

interface ErrorMessage {
  fallback: string | undefined;
  i18nString: string | undefined;
  severity: string;
  type: string;
}

export function errorMessageForStatus(status: number): ErrorMessage {
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

export function isSuccess(status: number): boolean {
  return (status >= HttpStatus.OK && status < HttpStatus.MULTIPLE_CHOICES)
      || status === HttpStatus.NOT_MODIFIED;
}

export function json(response: Response | undefined): Promise<any> {
  if (typeof response !== 'undefined'
      && response.status !== HttpStatus.NO_CONTENT
      && response.status !== HttpStatus.NOT_MODIFIED) {
    return response.json();
  }

  return Promise.resolve();
}

export function statusSuccess(response: Response): Promise<Response> {
  if (isSuccess(response.status)) {
    return Promise.resolve(response);
  }

  return Promise.reject(response);
}
