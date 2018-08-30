import fs from 'fs';

import { bundleName } from '../config';

const manifest = {};

let fileNames;
if (__DEVELOPMENT__) {
  fileNames = {
    'main.css': '/f_assets/main.bundle.css',
    'main.js': '/f_assets/main.bundle.js',
  };
} else {
  const manifestFile = fs.readFileSync(`./dist/private/manifest.${bundleName}.json`);
  fileNames = JSON.parse(manifestFile);
}

Object.keys(fileNames).forEach((fileName) => {
  manifest[fileName] = fileNames[fileName];
});

export default manifest;
