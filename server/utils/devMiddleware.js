/* eslint no-console: 0 */
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack/hot.config';

export default function (app) {
  if (__PRODUCTION__ === true) {
    process.exit(1);
  }
  console.log('🚧 Development extensions enabled');

  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    noInfo: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }));

  app.use(webpackHotMiddleware(compiler, compiler));
}
