import csp from 'helmet-csp';
import c2k from 'koa2-connect';

import { assetsHost } from '../config';

const defaultSrc = ["'self'"];

const childSrc = ['https://youtube.com', 'https://www.youtube.com'];
const connectSrc = [
  "'self'",
  'https://api.notubiz.nl',
  'https://api.openraadsinformatie.nl',
  'https://www.facebook.com',
  'https://analytics.argu.co',
  'https://argu-logos.s3.eu-central-1.amazonaws.com',
  (req) => `ws://${req.hostname}`,
];

const fontSrc = ["'self'", 'https://maxcdn.bootstrapcdn.com', 'https://fonts.gstatic.com'];
const frameSrc = [
  'https://youtube.com',
  'https://www.youtube.com',
  'https://*.typeform.com/',
  'https://webforms.pipedrive.com',
];
const imgSrc = [
  "'self'",
  'blob:',
  'data:',
  '*',
];
const objectSrc = ["'none'"];
const sandbox = [
  'allow-downloads',
  'allow-forms',
  'allow-modals',
  'allow-popups',
  'allow-popups-to-escape-sandbox',
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
  'https://www.googletagmanager.com',
  'https://webforms.pipedrive.com/f/loader',
  'https://cdn.eu-central-1.pipedriveassets.com/leadbooster-chat/assets/web-forms/loader.min.js',
  'https://browser-update.org',
  'https://argu-logos.s3.eu-central-1.amazonaws.com',
  'https://cdnjs.cloudflare.com',
  (req) => {
    const { manifest } = req.getCtx();

    if (!Array.isArray(manifest?.ontola?.tracking)) {
      return undefined;
    }

    return manifest
      .ontola
      .tracking
      .filter(({ type }) => type === 'Matomo' || type === 'PiwikPro')
      .map(({ host }) => `https://${host}`)
      .join(' ')
  },
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
const mediaSrc = [
  "'self'",
];

if (assetsHost) {
  workerSrc.push(assetsHost);
}

if (__DEVELOPMENT__) {
  scriptSrc.push('https://cdn.jsdelivr.net');
  styleSrc.push('https://cdn.jsdelivr.net');
  fontSrc.push('https://cdn.jsdelivr.net');
  workerSrc.push('https://cdn.jsdelivr.net');

  scriptSrc.push("'unsafe-inline'", "'unsafe-eval'", 'blob:');
  styleSrc.push('blob:');
  workerSrc.push('blob:');
  mediaSrc.push('https://argu.localdev')
  mediaSrc.push('http://localhost:3001')
}

if (['production', 'staging', 'test'].includes(process.env.NODE_ENV)) {
  connectSrc.push('https://notify.bugsnag.com');
  connectSrc.push('https://sessions.bugsnag.com');
}

export default async (ctx, next) => {
  await ctx.getManifest();

  return (
    c2k(csp({
      browserSniff: false,
      directives: {
        blockAllMixedContent: true,
        childSrc,
        connectSrc,
        defaultSrc,
        fontSrc,
        frameSrc,
        imgSrc,
        mediaSrc,
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
};
