require('../app/helpers/polyfills');
require('@babel/register')({
  ignore: [
    (filename) => !filename.match(/node_modules\/link-redux/),
  ],
});

global.fetch = require('jest-fetch-mock');

// Remove from here after dropping enzyme
require('raf/polyfill');
require('jest-enzyme');
require('whatwg-fetch');
const whatwgURL = require('whatwg-url').URL; // eslint-disable-line import/order

const siteName = global.window.document.createElement('meta');
siteName.content = 'https://app.argu.co/freetown';
siteName.name = 'website-iri';
global.window.document.head.appendChild(siteName);
// TODO: add removed script tag

const exposedProperties = ['window', 'navigator', 'document', 'fetch'];

// global.window.fetch = fetch;
// global.fetch = fetch;
global.URL = whatwgURL;
Object.keys(global.document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = global.document.defaultView[property];
  }
});

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
require('react');

const helpers = require('./specHelper');

Object.entries(helpers).forEach(([k, v]) => { global[k] = v; });

Enzyme.configure({ adapter: new Adapter() });
