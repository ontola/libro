const PORT_DEVELOPMENT = 3000;
const PORT_PRODUCTION = 8080;
const PORT = process.env.NODE_ENV === 'development' ? PORT_DEVELOPMENT : PORT_PRODUCTION;
const API_ROOT = process.env.API_URL || `http://localhost:${PORT}/api`;

const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL || 'https://aod-search.argu.co';
const ELASTICSEARCH_INDEX = process.env.ELASTICSEARCH_INDEX || 'aod';
const ELASTICSEARCH_DOCUMENT_BASE =
  `${ELASTICSEARCH_URL}/${ELASTICSEARCH_INDEX}/content/`;

export {
  PORT,
  API_ROOT,
  ELASTICSEARCH_URL,
  ELASTICSEARCH_INDEX,
  ELASTICSEARCH_DOCUMENT_BASE,
};
