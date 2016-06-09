const express = require('express');
const app = express();
const webpack = require('webpack');
const webpackConfig = require('../webpack/common.config');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const proxy = require('http-proxy').createProxyServer({});

const compiler = webpack(webpackConfig);
const renderFullPage = require('./utils/render').renderFullPage;
const port = process.env.NODE_ENV === 'development' ? 3000 : 80;

if (process.env.NODE_ENV === 'development') {
  app.use(webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
  }));
}

proxy.on('error', (err, req) => {
  console.error(err, req.url);
});

// Activate proxy for session
app.use(/\/api\/(.*)/, (req, res) => {
  req.url = req.originalUrl;
  proxy.web(req, res, { target: 'http://localhost:3030' });
});

// Static directory for express
//app.use('/dist', express.static(__dirname + '/../../dist/'));
app.use(express.static(__dirname + '/dist'));

app.get(/.*/, (req, res) => {
  const domain = req.get('host').replace(/\:.*/, '');
  res.end(renderFullPage('', port, domain));
});

app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
