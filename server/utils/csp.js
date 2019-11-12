import csp from 'helmet-csp';
import c2k from 'koa2-connect';

import { ASSETS_HOST } from '../../app/config';

const defaultSrc = ["'self'"];

const childSrc = ['https://youtube.com', 'https://www.youtube.com'];
const connectSrc = [
  "'self'",
  'https://api.notubiz.nl',
  'https://www.facebook.com',
  req => `ws://${req.hostname}`,
];

const fontSrc = ["'self'", 'https://maxcdn.bootstrapcdn.com', 'https://fonts.gstatic.com'];
const frameSrc = ['https://youtube.com', 'https://www.youtube.com'];
const imgSrc = [
  "'self'",
  'blob:',
  'data:',
  '*',
];
const objectSrc = ["'none'"];
const sandbox = [
  'allow-forms',
  'allow-modals',
  'allow-popups',
  'allow-presentation',
  'allow-same-origin',
  'allow-scripts',
];
const scriptSrc = [
  "'self'",
  "'unsafe-eval'",
  (req, res) => `'nonce-${res.locals.nonce}'`,
  'https://cdn.polyfill.io',
  // Bugsnag CDN
  'https://d2wy8f7a9ursnm.cloudfront.net',
  'https://storage.googleapis.com',
];
const styleSrc = [
  "'self'",
  // Due to using inline css with background-image url()
  "'unsafe-inline'",
  'maxcdn.bootstrapcdn.com',
  'fonts.googleapis.com',
];
const workerSrc = [
  "'self'",
];
if (ASSETS_HOST) {
  workerSrc.push(ASSETS_HOST);
}

if (__DEVELOPMENT__) {
  scriptSrc.push("'unsafe-inline'", "'unsafe-eval'", 'blob:');
  styleSrc.push('blob:');
  workerSrc.push('blob:');
}

if (__PRODUCTION__) {
  connectSrc.push('https://notify.bugsnag.com');
  connectSrc.push('https://sessions.bugsnag.com');
}

export default async (ctx, next) => (
  c2k(csp({
    browserSniff: true,
    directives: {
      blockAllMixedContent: true,
      childSrc,
      connectSrc,
      defaultSrc,
      fontSrc,
      frameSrc,
      imgSrc,
      objectSrc,
      sandbox,
      scriptSrc,
      styleSrc,
      upgradeInsecureRequests: true,
      workerSrc,
    },
    disableAndroid: false,
    loose: false,
    reportOnly: false,
    setAllHeaders: false,
  }))(ctx, next)
);
