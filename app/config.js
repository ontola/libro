const PORT_DEVELOPMENT = 3000;
const PORT_PRODUCTION = 8080;
const PORT_API = 3030;
const PORT = process.env.NODE_ENV === 'development' ? PORT_DEVELOPMENT : PORT_PRODUCTION;

const ARGU_API_URL = process.env.ARGU_API_URL || `http://localhost:${PORT_API}/`;
const ARGU_API_PROXIED = `http://localhost:${PORT}/`;
const ARGU_API_BASE = 'api/';

const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL || 'https://aod-search.argu.co/aod_search';
const ELASTICSEARCH_INDEX = process.env.ELASTICSEARCH_INDEX || 'aod';
const ELASTICSEARCH_DOCUMENT_BASE =
  `${ELASTICSEARCH_URL}/${ELASTICSEARCH_INDEX}/content/`;

export {
  PORT,
  ARGU_API_URL,
  ARGU_API_BASE,
  ARGU_API_PROXIED,
  ELASTICSEARCH_URL,
  ELASTICSEARCH_INDEX,
  ELASTICSEARCH_DOCUMENT_BASE,
};
