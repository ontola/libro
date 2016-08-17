/* eslint no-console: 0 */
import express from 'express';
import SearchkitExpress from 'searchkit-express';
import proxy from 'http-proxy-middleware';
import { renderFullPage } from './utils/render';

import * as constants from '../app/config';

export function listen(app, port) {
  app.listen(port, (err) => {
    if (err) {
      console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  });
}

export default function routes(app, port) {
  // Activate proxy for session
  app.use(/\/api\/(.*)/, proxy({
    target: constants.ARGU_API_URL,
    changeOrigin: true,
  }));

  // Static directory for express
  app.use('/static', express.static('static'));
  app.use('/dist', express.static('dist'));

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    next();
  });

  app.use('/aod_search', SearchkitExpress.createRouter({
    host: constants.ELASTICSEARCH_URL,
    index: constants.ELASTICSEARCH_INDEX,
  }));

  app.get(/.*/, (req, res) => {
    const domain = req.get('host').replace(/:.*/, '');
    res.end(renderFullPage('', port, domain));
  });
}
