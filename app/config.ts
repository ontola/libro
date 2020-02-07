/* eslint no-magic-numbers: 0 */

/** Retrieves an ENV var with fallbacks and test support */
const getEnv = (
  env: string,
  defaultVal: string | number,
  test: string | number,
): string | number => (
  process.env.NODE_ENV === 'test' ? test : process.env[env] || defaultVal
);

export const MATOMO_HOST = process.env.MATOMO_HOST;
export const MATOMO_PORT = process.env.MATOMO_PORT;
export const ASSETS_HOST = getEnv('ASSETS_HOST', '', '');
export const RELEASE_STAGE = process.env.RAILS_ENV;
export const FRONTEND_ACCEPT = 'application/hex+x-ndjson';
export const PORT_DEVELOPMENT = getEnv('PORT_DEVELOPMENT', 3001, 3001);
export const PORT_PRODUCTION = getEnv('PORT_PRODUCTION', 8080, 8080);
export const PORT = getEnv('PORT', (__DEVELOPMENT__ ? PORT_DEVELOPMENT : PORT_PRODUCTION), PORT_DEVELOPMENT);

// Used internally in the router as a reverse proxy
export const ARGU_API_URL = getEnv('ARGU_API_URL', 'https://argu.co', 'https://argu.localdev');

export const APP_ELEMENT = 'root';
export const CONTAINER_ELEMENT = 'App__container';
export const MAPBOX_TILE_API_BASE = 'https://api.tiles.mapbox.com/v4/';
