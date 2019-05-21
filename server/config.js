if (__CLIENT__) {
  throw new Error('Server code in client');
}

export * from '../app/config';

export const bugsnagKey = process.env.BUGSNAG_KEY;
export const bundleName = process.env.FE_BUNDLE_NAME || 'min';
export const clusterDomain = process.env.CLUSTER_DOMAIN || 'cluster.local';
export const defaultServicePort = process.env.DEFAULT_SERVICE_PORT || '3000';
export const defaultServiceProto = process.env.DEFAULT_SERVICE_PROTO || 'http';
export const namespace = process.env.NAMESPACE || '';
export const svcDNSPrefix = process.env.SERVICE_DNS_PREFIX === undefined ? 'svc' : process.env.SERVICE_DNS_PREFIX;
export const logLevel = process.env.LOG_LEVEL || 'info';

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
export const redisAddress = process.env.REDIS_ADDRESS;
/**
 * DO NOT USE this value, since it really is super secret.
 *
 * The session encryption secret.
 */
export const sessionSecret = process.env.SESSION_SECRET;

if (!oAuthToken && !__TEST__) {
  // eslint-disable-next-line no-console
  console.error('NO OAUTH TOKEN');
  process.exit(1);
}
if (!sessionSecret && !__TEST__) {
  // eslint-disable-next-line no-console
  console.log('NO SESSION SECRET');
  process.exit(1);
}
