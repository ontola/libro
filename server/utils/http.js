import { URL } from 'url';

export function isDownloadRequest(url) {
  return new URL(url, 'https://example.com').searchParams.get('download') === 'true';
}

export function isHTMLHeader(headers) {
  return headers.accept && (headers.accept.includes('text/html')
    || headers.accept.includes('application/xhtml+xml')
    || headers.accept.includes('application/xml'));
}
