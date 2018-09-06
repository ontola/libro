import csp from 'helmet-csp';

import { ASSETS_HOST, AWS_BUCKET } from '../../app/config';

const defaultSrc = ["'self'"];

const childSrc = ['https://youtube.com', 'https://www.youtube.com'];
const connectSrc = ["'self'", 'https://api.notubiz.nl'];
const fontSrc = ["'self'", 'https://maxcdn.bootstrapcdn.com', 'https://fonts.gstatic.com'];
const frameSrc = ['https://youtube.com', 'https://www.youtube.com'];
const imgSrc = [
  "'self'",
  'data:',
  'https://www.gravatar.com',
];
if (AWS_BUCKET) {
  imgSrc.push(`https://${AWS_BUCKET}.s3.amazonaws.com`);
}
if (ASSETS_HOST) {
  imgSrc.push(ASSETS_HOST);
}
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
  (req, res) => `'nonce-${res.locals.nonce}'`,
  'https://cdn.polyfill.io',
  // Bugsnag CDN
  'https://d2wy8f7a9ursnm.cloudfront.net',
  'https://cdn.logrocket.io',
];
const styleSrc = ["'self'", 'maxcdn.bootstrapcdn.com'];
const workerSrc = [
  "'self'",
];
if (ASSETS_HOST) {
  workerSrc.push(ASSETS_HOST);
}

if (__DEVELOPMENT__) {
  scriptSrc.push("'unsafe-inline'", "'unsafe-eval'", 'blob:');
  styleSrc.push("'unsafe-inline'", 'blob:');
  workerSrc.push('blob:');
}

export default csp({
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
});
