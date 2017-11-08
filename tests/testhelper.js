require('babel-register')({
  ignore(filename) {
    return !filename.match(/node_modules\/link-redux/);
  }
});
const { JSDOM } = require('jsdom');
const whatwgFetch = require('whatwg-fetch').fetch;
const whatwgURL = require('whatwg-url').URL; // eslint-disable-line import/order

const jsdom = new JSDOM(
  '<!doctype html><html><body></body></html>',
  {
    userAgent: 'node.js',
  }
);
const exposedProperties = ['window', 'navigator', 'document'];
const { window } = jsdom;

global.window = window;
global.document = window.document;
global.window.fetch = whatwgFetch;
global.URL = whatwgURL;

const ignoreGlobals = [
  'SVGPathSeg',
  'SVGPathSegClosePath',
  'SVGPathSegMovetoAbs',
  'SVGPathSegMovetoRel',
  'SVGPathSegLinetoAbs',
  'SVGPathSegLinetoRel',
  'SVGPathSegCurvetoCubicAbs',
  'SVGPathSegCurvetoCubicRel',
  'SVGPathSegCurvetoQuadraticRel',
  'SVGPathSegCurvetoQuadraticAbs',
  'SVGPathSegArcAbs',
  'SVGPathSegArcRel',
  'SVGPathSegLinetoHorizontalAbs',
  'SVGPathSegLinetoHorizontalRel',
  'SVGPathSegLinetoVerticalAbs',
  'SVGPathSegLinetoVerticalRel',
  'SVGPathSegCurvetoCubicSmoothAbs',
  'SVGPathSegCurvetoCubicSmoothRel',
  'SVGPathSegCurvetoQuadraticSmoothAbs',
  'SVGPathSegCurvetoQuadraticSmoothRel',
  'SVGPathElement',
  'SVGPathSegList',
];
ignoreGlobals.forEach((item) => {
  global[item] = () => null;
  global.window[item] = () => null;
});
global.window.SVGPathSeg.prototype = {};
global.window.SVGPathElement.prototype = {};
global.window.SVGPathSegList.prototype = {};

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-15');
require('react');

Enzyme.configure({ adapter: new Adapter() });
