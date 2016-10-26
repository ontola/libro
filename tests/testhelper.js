require('babel-register')();
const jsdom = require('jsdom').jsdom;

const exposedProperties = ['windnpm run ow', 'navigator', 'document'];

require.extensions['.scss'] = () => null;
global.document = jsdom('');
global.window = document.defaultView;

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
});

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};
