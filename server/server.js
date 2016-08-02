import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import SearchkitExpress from 'searchkit-express';
import proxy from 'http-proxy-middleware';
// import morgan from 'morgan';

import * as constants from '../app/constants/config';
import { renderFullPage } from './utils/render';
import webpackConfig from '../webpack/hot.config';

const compiler = webpack(webpackConfig);
const app = express();
const port = constants.PORT;

// app.use(morgan('short'));

if (process.env.NODE_ENV === 'development') {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    noInfo: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }));

  app.use(webpackHotMiddleware(compiler));
}

// Activate proxy for session
app.use(/\/api\/(.*)/, proxy({
  target: constants.ARGU_API_URL,
  changeOrigin: true,
}));


// Static directory for express
app.use('/static', express.static(`${__dirname}/../static/`));
app.use('/dist', express.static(`${__dirname}/../dist/`));

app.use('/aod_search', SearchkitExpress.createRouter({
  host: constants.ELASTICSEARCH_URL,
  index: constants.ELASTICSEARCH_INDEX,
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
