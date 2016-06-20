import express from 'express';
import webpack from 'webpack';
import webpackConfig from '../webpack/common.config.babel';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import SearchkitExpress from 'searchkit-express';
import bodyParser from 'body-parser';
import httpProxy from 'http-proxy';
import { renderFullPage } from './utils/render';

const compiler = webpack(webpackConfig);
const proxy = httpProxy.createProxyServer({});
const app = express();
const devPort = 3000;
const prodPort = 80;
const port = process.env.NODE_ENV === 'development' ? devPort : prodPort;
const MS = 1000;
const heartBeatTime = 10;
const ELASTICSEARCH_ADDRESS = process.env.ELASTICSEARCH_ADDRESS || 'http://128.199.44.185:9200';
const ELASTICSEARCH_INDEX = process.env.ELASTICSEARCH_INDEX || 'aod8';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') {
  app.use(webpackMiddleware(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath,
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: heartBeatTime * MS, reload: true,
  }));
}

proxy.on('error', (err, req) => {
  console.error(err, req.url);
});

// Activate proxy for session
app.use(/\/api\/(.*)/, (request, res) => {
  const req = request;
  req.url = request.originalUrl;
  proxy.web(req, res, { target: 'http://localhost:3030' });
});

// Static directory for express
app.use('/static', express.static(`${__dirname}/../static/`));
app.use('/dist', express.static(`${__dirname}/../dist/`));
app.use('/aod_search', SearchkitExpress.createRouter({
  host: ELASTICSEARCH_ADDRESS,
  index: ELASTICSEARCH_INDEX,
}));

app.get(/.*/, (req, res) => {
  const domain = req.get('host').replace(/:.*/, '');
  res.end(renderFullPage('', port, domain));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
