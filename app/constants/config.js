
const devPort = 3000;
const prodPort = 8080;
const port = process.env.NODE_ENV === 'development' ? devPort : prodPort;

export const API_ROOT = `http://localhost:${port}/api`;
