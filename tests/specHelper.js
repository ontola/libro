const set = require('jest-plugin-set').default;
const { shallow } = require('enzyme');
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

function declareProps(arr, ...params) {
  let props = {};
  if (typeof arr === 'object') {
    props = Object.assign({}, arr);
  } if (typeof arr === 'string') {
    props[arr] = undefined;
  }
  const rest = Array.isArray(arr) ? params.concat(arr) : params;
  rest.forEach((r) => { props[r] = undefined; });

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

function marker(name) {
  return `[data-test="${markerNS}-${name}"]`;
}

function argUnitCustom(desc, comp, props, func) {
  describe(desc, () => {
    defineMarker(desc);
    declareProps(...props);
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

module.exports = {
  argUnit,
  declareProps,
  defineMarker,
  marker,
};
