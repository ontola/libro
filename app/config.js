/* eslint no-magic-numbers: 0 */
function getEnv(env, defaultVal, test) {
  return process.env.NODE_ENV === 'test' ? test : process.env[env] || defaultVal;
}

export const ASSETS_HOST = getEnv('ASSETS_HOST', '', '');
export const FRONTEND_HOSTNAME = getEnv('FRONTEND_HOSTNAME', 'argu.co', 'argu.dev');
export const FRONTEND_URL = `https://${FRONTEND_HOSTNAME}`;
export const PORT_DEVELOPMENT = getEnv('PORT_DEVELOPMENT', 3001, 3001);
export const PORT_PRODUCTION = getEnv('PORT_PRODUCTION', 8080, 8080);
export const PORT = getEnv('PORT', (__DEVELOPMENT__ ? PORT_DEVELOPMENT : PORT_PRODUCTION), PORT_DEVELOPMENT);
export const STAGE = process.env.NODE_ENV === 'production' ? 'production' : 'staging';

// Used internally in the router as a reverse proxy
export const ARGU_API_URL = getEnv('ARGU_API_URL', 'https://argu.co', 'https://argu.dev');
