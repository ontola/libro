import express from 'express';
import React from 'react';
import merge from 'merge';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';
import fs from 'fs';
import httpProxy from 'http-proxy';
import { apiGetMotions } from '../app/actions/motions';
import configureStore from '../app/store//configureStore';
import routes from '../app/routes.js';
import { apiFetch } from './utils/api';
import { renderFullPage } from './utils/render';

global.location = {};
global.window = {};
global.document = {};

const app = express();
const proxy = httpProxy.createProxyServer({});
const devPort = process.env.NODE_ENV === 'development' ? 3001 : 80;
const port = process.env.NODE_ENV === 'development' ? 3000 : 80;
const fetchData = (component, host, pathname, params) => {
  return new Promise(resolve => {
    switch (component) {
      case 'motions':
        apiFetch(apiGetMotions(), host).then(res => {
          resolve({
            items: res
          });
        });
        break;
      case 'motion':
        apiFetch(apiGetMotions(params.motionId), host).then(res => {
          resolve({
            items: res
          });
        });
        break;
      default:
        resolve({});
    }
  });
};

// Activate proxy for session
app.use(/\/api\/(.*)/, (req, res) => {
  req.url = req.originalUrl;
  proxy.web(req, res, { target: 'http://localhost:3030' });
});

// Static directory
app.use('/static', express.static(`${__dirname}/../static/`));
app.use('/dist', express.static(`${__dirname}/../dist/`));

function handleRender(req, res) {
  return match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).end(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const { location: { pathname }, params } = renderProps;
      const host = req.get('host').replace(/\:.*/, '');
      const initialState = configureStore().getState();
      const query = pathname.split('/')[1];

      return fetchData(query, host, pathname, params).then(appState => {
        const finishState = merge.recursive(initialState, {
          ...appState,
        });

        const store = configureStore(initialState);
        const html = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );

        const head = Helmet.rewind();
        const finalState = store.getState();
        res.status(200).end(renderFullPage(html, devPort, host, finalState, head));
      })
    } else {
      res.json();
    }
  });
}

app.use(handleRender);

app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
