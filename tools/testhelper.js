// @flow
require('babel-register')();

function ignoreStyles() {
  return null;
}

var jsdom = require('jsdom').jsdom;
var exposedProperties = ['window', 'navigator', 'document'];

require.extensions['.scss'] = ignoreStyles;
global.document = jsdom('');
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

documentRef = document;
