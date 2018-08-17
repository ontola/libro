import fs from 'fs';

import { bundleName } from '../config';

const manifest = {};

let fileNames;
if (__DEVELOPMENT__) {
  fileNames = {
    'main.css': '/main.bundle.css',
    'main.js': '/main.bundle.js',
    'manifest.json': '/manifest.json',
  };
} else {
  const manifestFile = fs.readFileSync(`./dist/private/manifest.${bundleName}.json`);
  fileNames = JSON.parse(manifestFile);
}

const manifestTest = /manifest.[a-zA-Z0-9]*.json/;
Object.keys(fileNames).forEach((fileName) => {
  if (manifestTest.test(fileName)) {
    manifest['manifest.json'] = fileNames[fileName];
  }
  manifest[fileName] = fileNames[fileName];
});

export default manifest;
