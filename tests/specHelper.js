import { ctx } from './index';

const { mount, shallow } = require('enzyme');
const React = require('react');

const define = ({ scope, name, block }) => {
  let value;
  let isEvaluated = false;

  Object.defineProperty(scope, name, {
    configurable: true,

    // Set to the lazily evaluated function.
    get() {
      // If the value has been computed before, return that value.
      // Otherwise, we should compute it!
      if (!isEvaluated) {
        try {
          value = block.call(scope);
        } finally {
          isEvaluated = true;
        }
      }

      return value;
    },
  });
};

function normalizeProps(arr, ...params) {
  let props = {};
  if (arr instanceof Object && arr.constructor === Object) {
    props = Object.assign({}, arr);
  } if (typeof arr === 'string') {
    props[arr] = undefined;
  }

  let rest = Array.isArray(arr) ? arr : [];
  if (params[params.length - 1]) {
    rest = rest.concat(params[params.length - 1]);
  }
  rest.forEach((r) => { props[r] = undefined; });

  return props;
}

function declareProps(arr, ...params) {
  const props = normalizeProps(arr, params);
  Object.entries(props).forEach(([k, v]) => set(k, () => v));
}

function declareTestProps(arr, ...params) {
  const props = normalizeProps(arr, params);
  Object.entries(props).forEach((k, v) => define({ block: () => v, name: k, scope: global }));
  set('testProps', () => {
    const propMap = {};
    Object.keys(props).forEach((p) => { propMap[p] = global[p]; });
    return propMap;
  });
}

function defineMarker(ns) {
  set('markerNS', () => ns);
}

function marker(name, ...other) {
  return `[data-test="${markerNS}-${name}${Array.isArray(other) ? ['', ...other].join('-') : ''}"]`;
}

function argUnitCustom(desc, comp, props, func) {
  describe(desc, () => {
    defineMarker(desc);
    declareTestProps(...props);
    set('subject', () => comp(testProps));
    func();
  });
}

/**
 * Sets up an Argu-style unit test.
 * @param {React.Component} comp The component to test.
 * @param {String[]} props The properties to be defined.
 * @param {function} func The test body.
 * @returns {undefined}
 */
function argUnit(comp, func) {
  const desc = comp.name;
  const props = Object.keys(comp.propTypes);
  const render = p => shallow(React.createElement(comp, p));

  argUnitCustom(desc, render, props, func);
}

function createContext(opts = {}) {
  const {
    c: components,
    ch: children,
    r: resources,
    s: subject,
    t: topology
  } = opts;
  return ctx.loc({
    children: children || ch,
    components: components || c,
    resources: resources || r,
    subject: subject || s,
    topology: topology || t,
  });
}

function describeView(desc, components, resources, subject, func) {
  describe(desc, () => {
    defineMarker(desc);
    set('c', () => undefined);
    set('ch', () => undefined);
    declareProps({
      c: components,
      r: resources,
      s: subject,
      t: undefined
    });
    set('subject', () => mount(createContext()));
    func();
  });
}

function as(topology, func) {
  describe(topology.value, () => {
    set('t', () => topology);
    func();
  });
}

module.exports = {
  argUnit,
  as,
  createContext,
  declareProps,
  defineMarker,
  describeView,
  marker,
  normalizeProps,
};
