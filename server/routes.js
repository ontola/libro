/* eslint no-console: 0 */
import bodyParser from 'body-parser';
import express from 'express';
import proxy from 'http-proxy-middleware';
import SearchkitExpress from 'searchkit-express';

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
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Activate proxy for session
  app.use(/\/api\/(.*)/, proxy({
    target: constants.ARGU_API_URL,
    changeOrigin: true,
  }));

  // Static directory for express
  app.use('/static', express.static('static'));
  app.use('/dist', express.static('dist'));

  app.use('/aod_search', SearchkitExpress.createRouter({
    host: constants.ELASTICSEARCH_URL,
    index: constants.ELASTICSEARCH_INDEX,
  }));

  app.get(/.*/, (req, res) => {
    const accept = req.get('Accept');
    if (accept && accept.includes('application/vnd.api+json')) {
      return proxy({
        target: constants.ARGU_API_URL,
        pathRewrite: { '^/': '/api' },
        changeOrigin: true,
      });
    }
    const domain = req.get('host').replace(/:.*/, '');
    res.end(renderFullPage('', port, domain));
    return undefined;
  });
}
