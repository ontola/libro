if (__CLIENT__) {
  throw new Error('Server code in client');
}

export * from '../app/config';

export const assetsHost = process.env.ASSETS_HOST || '';
export const backendApiUrl = process.env.ARGU_API_URL || process.env.BACKEND_API_URL || 'https://argu.localdev';
export const bugsnagKey = process.env.BUGSNAG_KEY;
export const cacheDirectory = process.env.CACHE_DIRECTORY;
export const clientId = process.env.ARGU_APP_ID || process.env.LIBRO_CLIENT_ID;
export const clientSecret = process.env.ARGU_APP_SECRET || process.env.LIBRO_CLIENT_SECRET;
export const defaultBackendSVCName = process.env.DEFAULT_BACKEND_SVC_NAME || 'argu';
export const defaultServicePort = process.env.DEFAULT_SERVICE_PORT || '3000';
export const defaultServiceProto = process.env.DEFAULT_SERVICE_PROTO || 'http';
export const logLevel = process.env.LOG_LEVEL || 'info';
export const mapboxTileAPIBase = process.env.MAPBOX_TILE_API_BASE || 'https://api.mapbox.com/styles/v1';
export const mapboxTileStyle = process.env.MAPBOX_TILE_STYLE || 'mapbox/streets-v11';
export const mapboxTileURL = `${mapboxTileAPIBase}/${mapboxTileStyle}`;
export const maxUploadFileSizeMb = process.env.MAX_UPLOAD_FILE_SIZE_MB ?? '100';
export const portDevelopment = process.env.PORT_DEVELOPMENT || '3001';
export const portProduction = process.env.PORT_PRODUCTION || '8080';
export const port = process.env.PORT || (__DEVELOPMENT__ ? portDevelopment : portProduction);
export const serverName = process.env.SERVER_NAME;
export const sessionCookieName = process.env.SESSION_COOKIE_NAME || 'koa:sess';
export const standaloneLibro = process.env.STANDALONE === 'true';
export const websocketPath = process.env.WEBSOCKET_PATH;
export const cacheChannel = process.env.CACHE_CHANNEL;

export const redisSettingsNS = 'frontend';

export const namespace = process.env.NAMESPACE || '';
export const clusterDomain = process.env.CLUSTER_DOMAIN || 'cluster.local';
export const svcDNSPrefix = process.env.SERVICE_DNS_PREFIX === undefined ? 'svc' : process.env.SERVICE_DNS_PREFIX;
export const clusterURLBase = process.env.CLUSTER_URL_BASE || `${namespace ? `.${namespace}` : ''}${svcDNSPrefix ? `.${svcDNSPrefix}` : ''}.${clusterDomain}`;

/**
 * Values from here really are secret.
 * DO NOT USE THESE
 */

export const mapboxKey = process.env.MAPBOX_KEY || '';
export const mapboxUsername = process.env.MAPBOX_USERNAME || '';

/**
 * DO NOT USE this value, since it really is super secret.
 *
 * An OAuth access token of this front-end instance.
 * This token is needed when creating new users.
 */
export const oAuthToken = process.env.RAILS_OAUTH_TOKEN;
/**
 * DO NOT USE this value, since it really is super secret.
 *
 * This allows us to verify whether JWT's are actually created by the back-end.
 * We currently use symmetric encryption, so this is very secret until we switch to asym, since it'd
 * allow users to spoof sessions.
 */
export const jwtEncryptionToken = process.env.JWT_ENCRYPTION_TOKEN;
/**
 * A redis connection FQ-URL.
 */
export const redisUrl = process.env.REDIS_URL;
/**
 * DO NOT USE this value, since it really is super secret.
 *
 * The session encryption secret.
 */
export const sessionSecret = process.env.SESSION_SECRET;

if (!oAuthToken) {
  // eslint-disable-next-line no-console
  console.error('NO OAUTH TOKEN');
  if (__PRODUCTION__) {
    process.exit(1);
  }
}
if (!sessionSecret && !__TEST__) {
  // eslint-disable-next-line no-console
  console.log('NO SESSION SECRET');
  process.exit(1);
}
