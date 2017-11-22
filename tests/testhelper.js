require('babel-register')({
  ignore(filename) {
    return !filename.match(/node_modules\/link-redux/);
  }
});
require('raf/polyfill');
const { JSDOM } = require('jsdom');
require('jest-enzyme');
require('whatwg-fetch');
const whatwgURL = require('whatwg-url').URL; // eslint-disable-line import/order

const jsdom = new JSDOM(
  '<!doctype html><html><head><title></title><script src="whatwg-fetch.js"></head><body></body></html>',
  {
    userAgent: 'node.js',
  }
);
const exposedProperties = ['window', 'navigator', 'document', 'fetch'];
const { window } = jsdom;

global.window = window;
global.document = window.document;
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
