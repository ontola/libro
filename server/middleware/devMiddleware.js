/* eslint no-console: 0 */
import c2k from 'koa2-connect';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../../webpack/hot.config';

export default function(app) {
  if (__PRODUCTION__ === true) {
    console.error('DEV MIDDLEWARE RUN IN PRODUCTION');
    process.exit(1);
  }
  console.log('🚧 Development extensions enabled');

  const compiler = webpack(webpackConfig);

  app.use(c2k(webpackDevMiddleware(compiler, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    publicPath: webpackConfig.output.publicPath,
  })));

  app.use(c2k(webpackHotMiddleware(compiler, compiler)));
}
