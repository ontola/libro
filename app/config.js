/* eslint no-magic-numbers: 0 */
const ASSETS_HOST = process.env.ASSETS_HOST || '';
const FRONTEND_HOSTNAME = process.env.FRONTEND_HOSTNAME || 'https://beta.argu.co';
const PORT_DEVELOPMENT = process.env.PORT_DEVELOPMENT || 3001;
const PORT_PRODUCTION = process.env.PORT_PRODUCTION || 8080;
const PORT = process.env.PORT || (__DEVELOPMENT__ ? PORT_DEVELOPMENT : PORT_PRODUCTION);

// Used internally in the router as a reverse proxy
const ARGU_API_URL = process.env.ARGU_API_URL || 'https://argu.co';
const AOD_API_URL = process.env.AOD_API_URL || '/';

// Used externally as the endpoint for API calls by the browser app
const ARGU_API_URL_EXT = process.env.ARGU_API_EXT_BASE || '/api/';

const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL || 'https://beta.argu.local/aod_search';
const ELASTICSEARCH_INDEX = process.env.ELASTICSEARCH_INDEX || 'aod';

export {
  PORT,
  AOD_API_URL,
  ARGU_API_URL,
  ARGU_API_URL_EXT,
  ASSETS_HOST,
  ELASTICSEARCH_URL,
  ELASTICSEARCH_INDEX,
  FRONTEND_HOSTNAME,
};
