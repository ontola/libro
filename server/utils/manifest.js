import fs from 'fs';

import { bundleName } from '../config';

function getManifest(build) {
  const manifest = {};

  let fileNames = {};
  if (__DEVELOPMENT__) {
    [
      ['main.css', 'main.bundle.css'],
      ['main.js', 'main.bundle.js'],
      ['manifest.json', 'manifest.json'],
    ].forEach(([key, bundle]) => {
      Object.defineProperty(manifest, key, {
        get: () => `/${bundle}?q=${Math.random()}`,
      });
    });
  } else {
    const manifestFile = fs.readFileSync(`./dist/private/manifest.${bundleName}-${build}.json`);
    fileNames = JSON.parse(manifestFile);
  }

  const manifestTest = /manifest.[a-zA-Z0-9-]*.json/;
  Object.keys(fileNames).forEach((fileName) => {
    if (manifestTest.test(fileName)) {
      manifest['manifest.json'] = fileNames[fileName];
    }
    manifest[fileName] = fileNames[fileName];
  });

  return manifest;
}

export default {
  legacy: getManifest('legacy'),
  module: getManifest('module'),
};
