/* eslint no-console: 0 */
import bodyParser from 'body-parser';
import express from 'express';
import proxy from 'http-proxy-middleware';
import request from 'request';
import SearchkitExpress from 'searchkit-express';

import { renderFullPage } from './utils/render';
import * as constants from '../app/config';
const railsToken = process.env.RAILS_OAUTH_TOKEN;

export function listen(app, port) {
  app.listen(port, (err) => {
    if (err) {
      console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  });
}

function setHeaders(proxyReq, req) {
  if (req.header('Cookie')) {
    proxyReq.setHeader('Cookie', req.header('Cookie'));
  }
}

const arguBackendRequests = proxy({
  target: constants.ARGU_API_URL,
  changeOrigin: true,
  strictSSL: false,
  toProxy: true,
  secure: false,
  xfwd: true,
  onProxyReq: setHeaders,
});

const odApiProxy = proxy({
  target: constants.AOD_API_URL,
  pathRewrite: { '^/': '/api/' },
  changeOrigin: true,
});

export default function routes(app, port) {
  app.post(/^\/(f|m|q|a|u|v|c_a|users|vote_matches|oauth)(\/|$)/, (req, res) => {
    const accept = req.get('Accept');
    if (accept && (accept.includes('application/vnd.api+json') || accept.includes('application/json'))) {
      return arguBackendRequests(req, res);
    }
    return res.status(406).end();
  });

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

  app.post('/csrfToken', (req, res) => {
    request(
      {
        url: `${constants.ARGU_API_URL}/csrf.json`,
        strictSSL: false,
        xfwd: true,
        headers: {
          Authorization: `Bearer ${railsToken}`,
          Cookie: req.header('Cookie'),
        },
      },
      (error, response, body) => {
        let csrfToken;
        try {
          csrfToken = JSON.parse(body).token;
        } catch (SyntaxError) {
          csrfToken = '';
        }
        if (response) {
          res.set('Set-Cookie', response.headers['set-cookie']);
        }
        res.end(JSON.stringify({
          csrfToken,
        }));
      }
    );
  });

  app.get(/.*/, (req, res) => {
    const accept = req.get('Accept');
    if (accept && (accept.includes('application/vnd.api+json') || accept.includes('application/json'))) {
      if (req.originalUrl.match(/^\/(f|m|q|a|u|v|c_a|vote_matches)(\/|$)/) !== null) {
        return arguBackendRequests(req, res);
      }
      return odApiProxy(req, res);
    }
    const domain = req.get('host').replace(/:.*/, '');

    if (railsToken !== undefined && railsToken !== '') {
      const headers = req.header('Cookie') ? { Cookie: req.header('Cookie') } : {};
      request(
        {
          url: `${constants.ARGU_API_URL}/csrf.json`,
          strictSSL: false,
          xfwd: true,
          headers: Object.assign({
            Authorization: `Bearer ${railsToken}`,
          }, headers),
        },
        (error, response, body) => {
          let csrfToken;
          try {
            csrfToken = JSON.parse(body).token;
          } catch (SyntaxError) {
            csrfToken = '';
          }
          res.end(renderFullPage('', port, domain, csrfToken));
        }
      );
    } else {
      res.end(renderFullPage('', port, domain, ''));
    }
    return undefined;
  });
}
