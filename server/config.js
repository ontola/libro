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
 * DO NOT USE this value, since it really is secret.
 *
 * An OAuth access token of this front-end instance.
 * This token is needed when creating new users.
 */
export const oAuthToken = process.env.RAILS_OAUTH_TOKEN;
/**
 * A redis connection FQ-URL.
 */
export const redisAddress = process.env.REDIS_ADDRESS;
/**
 * DO NOT USE this value, since it really is secret.
 *
 * The session encryption secret.
 */
export const sessionSecret = process.env.SESSION_SECRET;

if (!oAuthToken) {
  // eslint-disable-next-line no-console
  console.error('NO OAUTH TOKEN');
  process.exit(1);
}
if (!sessionSecret) {
  // eslint-disable-next-line no-console
  console.log('NO SESSION SECRET');
  process.exit(1);
}
