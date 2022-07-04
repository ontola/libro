import { getMetaContent } from '../../Kernel/lib/dom';

export function getLinkContent(rel: string): string | null | undefined {
  const header = __CLIENT__
    ? document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
    : undefined;

  return header && header.href;
}

export function getAuthenticityToken(): string | undefined {
  return getMetaContent('csrf-token');
}

export function authenticityHeader(options?: Record<string, string>): Record<string, string> {
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
export function jsonHeader(options?: Record<string, string>): Record<string, string> {
  return Object.assign({}, options || {}, {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/json',
  });
}

export function websiteIRIHeader(options?: Record<string, string>): Record<string, string> {
  return Object.assign({}, options || {}, {
    'Website-Iri': getMetaContent('website'),
  });
}

/**
 * Lets fetch include credentials in the request. This includes cookies and other possibly sensitive
 * data.
 * Note: Never use for requests across (untrusted) domains.
 * @param options Object to be merged with safeCredentials options.
 * @returns The merged object.
 */
export function safeCredentials(options: any = {}): Record<string, string> {
  return Object.assign({}, options, {
    credentials: 'include',
    headers: Object.assign(
      {},
      authenticityHeader(),
      jsonHeader(),
      websiteIRIHeader(),
      options.headers,
    ),
    mode: 'same-origin',
  });
}
