import fs from 'fs';

import MD5 from 'md5.js';

import { cacheDirectory } from '../config';

export const fileFromCache = (iri) => {
  try {
    const parsedURL = new URL(iri);
    const format = parsedURL.pathname.split('.')[1] || 'hndjson';
    [parsedURL.pathname] = parsedURL.pathname.split('.');
    const hashId = new MD5().update(parsedURL.toString()).digest('hex');
    const filePath = `${cacheDirectory}/latest/${hashId.match(/.{1,8}/g).join('/')}/latest/index.${format}`;
    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
      return filePath;
    }

    return undefined;
  } catch {
    return undefined;
  }
};

export const readFileFromCache = (iri) => {
  const cachedFile = fileFromCache(iri);
  if (cachedFile) {
    return fs.readFileSync(cachedFile, { encoding: 'utf-8' });
  }

  return undefined;
};
