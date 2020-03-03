import { URL } from 'url';

export function isDownloadRequest(url) {
  return new URL(url, 'https://example.com').searchParams.get('download') === 'true';
}

export function isHTMLHeader(headers) {
  return headers.accept && (headers.accept.includes('text/html')
    || headers.accept.includes('application/xhtml+xml')
    || headers.accept.includes('application/xml'));
}

export function securityHeaders(ctx, next) {
  ctx.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  ctx.set('X-XSS-Protection', '1; mode=block');
  ctx.set('X-Content-Type-Options', 'nosniff');
  ctx.set('X-Frame-Options', 'DENY');

  return next();
}
