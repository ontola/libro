const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack/common.config.babel');
const compiler = webpack(webpackConfig);

const app = express();
const port = 3001;
const MS = 1000;
const heartBeatTime = 10;

global.ssr = true;

(function initWebpack() {
  app.use(webpackMiddleware(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath,
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: heartBeatTime * MS,
  }));
}());

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
