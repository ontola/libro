import fs from 'fs';
import path from 'path';

import HttpStatus from 'http-status-codes';

import logging from '../utils/logging';

const serviceWorker = async (req, res) => {
  try {
    const [url, params] = req.originalUrl.split('?');

    const serviceWorkerFile = fs
      .readFileSync(path.resolve('dist', 'public', url.split('/').pop()))
      .toString();

    res.setHeader('Content-Type', 'application/javascript');
    res.write(
      serviceWorkerFile
        .replace(/f_assets\/precache-manifest\.[0-9a-z]+.js/gi, x => [x, params].join('?'))
    );
    res.status(HttpStatus.OK);
    res.end();
  } catch (e) {
    logging.error(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    res.end();
  }
};

export default serviceWorker;
