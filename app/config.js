/* eslint no-magic-numbers: 0 */
export const ASSETS_HOST = process.env.ASSETS_HOST || '';
export const FRONTEND_HOSTNAME = process.env.FRONTEND_HOSTNAME || 'beta.argu.co';
export const FRONTEND_URL = `https://${FRONTEND_HOSTNAME}`;
export const PORT_DEVELOPMENT = process.env.PORT_DEVELOPMENT || 3001;
export const PORT_PRODUCTION = process.env.PORT_PRODUCTION || 8080;
export const PORT = process.env.PORT || (__DEVELOPMENT__ ? PORT_DEVELOPMENT : PORT_PRODUCTION);

// Used internally in the router as a reverse proxy
export const ARGU_API_URL = process.env.ARGU_API_URL || 'https://argu.co';
export const AOD_API_URL = process.env.AOD_API_URL || '/';

// Used externally as the endpoint for API calls by the browser app
export const ARGU_API_URL_EXT = process.env.ARGU_API_EXT_BASE || '/api/';

export const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL || 'https://beta.argu.co/aod_search';
export const ELASTICSEARCH_INDEX = process.env.ELASTICSEARCH_INDEX || 'aod';
