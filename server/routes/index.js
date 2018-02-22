/* eslint no-console: 0 */
import bodyParser from 'body-parser';
import csurf from 'csurf';
import express from 'express';
import morgan from 'morgan';

import * as constants from '../../app/config';
import apiMiddleware from '../middleware/apiMiddleware';
import errorHandlerMiddleware from '../middleware/errorHandlerMiddleware';
import sessionMiddleware from '../middleware/sessionMiddleware';
import { isAuthenticated, isBackend, isIframe } from '../utils/filters';
import manifest from '../utils/manifest';
import { backendProxy, iframeProxy } from '../utils/proxies';
import { handleRender } from '../utils/render';

import login from './login';

export function listen(app, port) {
  app.listen(port, (err) => {
    if (err) {
      console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up %s in your browser.', port, constants.FRONTEND_URL);
  });
}

export default function routes(app, port) {
  app.use(morgan('dev'));

  // Static directory for express
  app.use('/static', express.static('static'));
  app.use('/f_assets', express.static('dist/public'));
  app.get('/assets/*', backendProxy);
  app.get('/packs/*', backendProxy);

  app.use(sessionMiddleware);

  app.use(apiMiddleware);

  app.all('*', isIframe, isAuthenticated, iframeProxy);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(csurf());

  app.all('*', isBackend, isAuthenticated, backendProxy);

  app.post('/login', login);

  app.get(/.*/, (req, res) => {
    const domain = req.get('host').replace(/:.*/, '');

    res.setHeader(
      'Link',
      [
        `<${constants.FRONTEND_URL}/static/preloader.css>; rel=preload; as=style`,
        `<${constants.ASSETS_HOST}${manifest['main.js']}>; rel=preload; as=script`,
        `<${constants.ASSETS_HOST}${manifest['main.css']}>; rel=preload; as=style`,
      ]
    );
    handleRender(req, res, port, domain);
    return undefined;
  });

  app.use(errorHandlerMiddleware);
}
