export * from '../app/config';

export const bundleName = process.env.FE_BUNDLE_NAME || 'min';
/**
 * DO NOT USE this value, since it really is secret.
 *
 * The OAuth client ID of this front-end instance.
 */
export const clientID = process.env.RAILS_OAUTH_CLIENT_ID;
/**
 * DO NOT USE this value, since it really is secret.
 *
 * The OAuth client secret of this front-end instance.
 */
export const clientSecret = process.env.RAILS_OAUTH_CLIENT_SECRET;
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
