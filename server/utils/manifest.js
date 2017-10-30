import fs from 'fs';

const manifest = {};

let fileNames;
if (__DEVELOPMENT__) {
  fileNames = {
    'main.css': '/f_assets/bundle.css',
    'main.js': '/f_assets/bundle.js',
  };
} else {
  const manifestFile = fs.readFileSync('./dist/private/manifest.json');
  fileNames = JSON.parse(manifestFile);
}

Object.keys(fileNames).forEach((fileName) => {
  manifest[fileName] = fileNames[fileName];
});

export default manifest;
