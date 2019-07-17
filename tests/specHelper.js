import LinkedRenderStore, { list, seq } from 'link-lib';
import { RenderStoreProvider } from 'link-redux';
import { IntlProvider, injectIntl } from 'react-intl';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';

import { generateStore } from './link-redux/utilities';
import * as ctx from './link-redux/fixtures';
import './link-matchers';

const { mount, shallow } = require('enzyme');
const React = require('react');

const VAR_PREFIX = '__argu_global_prop_';

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

function propName(k) {
  return `${VAR_PREFIX}${k}`;
}

function declareTestProps(arr, ...params) {
  const props = normalizeProps(arr, params);
  Object.entries(props).forEach(([k, v]) => define({
    block: () => v,
    name: propName(k),
    scope: global,
  }));

  set('testProps', () => {
    const propMap = {};
    Object.keys(props).forEach((p) => {
      propMap[p] = global[propName(p)];
    });
    return propMap;
  });
}

function defineMarker(ns) {
  set('markerNS', () => ns);
}

/**
 * Generate a marker for the current testing scope (ABNF `component-name`) to use in `find` queries.
 * @param {String} name The name of the primary feature (ABNF required `feature-name`).
 * @param {String[]} [other] List of descendant feature names (ABNF optional `feature-name`'s).
 * @return {string} A CSS query search string for the associated marker name.
 */
function marker(name, ...other) {
  const add = `${name || ''}${Array.isArray(other) ? ['', ...other].join('-') : ''}`;
  return `[data-test="${markerNS}${add.length > 0 ? `-${add}` : ''}"]`;
}

/**
 * Low-level Argu unit test interface. Use {argUnit} unless you have no other option.
 * @see {argUnit}
 * @param {String} desc Description of the component, also used as a marker prefix.
 * @param {React.Component} comp The component to test.
 * @param {String[]} props The properties to be defined.
 * @param {function} func The test body.
 * @return {undefined}
 */
function argUnitCustom(desc, comp, props, func) {
  describe(desc, () => {
    defineMarker(desc);
    declareTestProps(...props);
    set('subject', () => comp(testProps));
    func();
  });
}

/**
 * Sets up an Argu-style unit test;
 * It sets up the subject as a shallow rendering of {Component}.
 * It declares all the {Component}'s prop types as settable variables.
 * It defines the marker prefix to be the name of the component.
 * @param {React.Component} comp The component to test.
 * @param {function} func The test body.
 * @param {object} opts Test option toggles.
 * @return {undefined}
 */
function argUnit(comp, func, opts = {}) {
  const desc = comp.displayName || comp.name;
  // eslint-disable-next-line react/forbid-foreign-prop-types
  const props = Object.keys(opts.propTypes || comp.propTypes);

  const render = (p) => {
    const method = (opts.mount === true || opts.intl) ? mount : shallow;
    let element = React.createElement(opts.intl === 'inject' ? injectIntl(comp) : comp, p);
    const lrs = new LinkedRenderStore();
    if (opts.link || opts.redux) {
      element = React.createElement(RenderStoreProvider, { value: lrs }, element);
    }
    if (opts.redux || opts.intl) {
      element = React.createElement(Provider, { store: generateStore() }, element);
    }
    if (opts.intl) {
      element = React.createElement(IntlProvider, { locale: 'en' }, element);
    }
    if (opts.router || opts.intl) {
      element = React.createElement(StaticRouter, {}, element);
    }
    return method(element);
  };

  argUnitCustom(desc, render, props, func);
}

function createContext(opts = {}) {
  const {
    c: components,
    ch: children,
    r: resources,
    s: subject,
    t: topology,
  } = opts;
  return ctx.loc({
    children: children || ch,
    components: components || c,
    resources: resources || r,
    subject: subject || s,
    topology: topology || t,
  });
}

/**
 * Sets up a view test environment.
 * @see {fixtures.loc}
 * @param {String} desc The name of the view (generally equal to the parent folder).
 * @param {Object[]} components An array of `LRS.registerRenderer` formatted registrations.
 * @param {rdf.Statement[]} resources Dataset to load into the store.
 * @param {rdf.NamedNode} subject The URI of the object to render.
 * @param {function} func The further test body.
 * @return {undefined}
 */
function describeView(desc, components, resources, subject, func) {
  describe(desc, () => {
    defineMarker(desc);
    set('c', () => undefined);
    set('ch', () => undefined);
    declareProps({
      c: components,
      r: resources,
      s: subject,
      t: undefined,
    });
    set('subject', () => mount(createContext()));
    func();
  });
}

/**
 * Overrides the current topology.
 * @param {rdf.NamedNode} topology The topology to use for the component.
 * @param {function} func The further test body.
 * @return {undefined}
 */
function as(topology, func) {
  describe(topology.value, () => {
    set('t', () => topology);
    func();
  });
}

function setProp(key, block) {
  set(propName(key), block);
}

function has(prop, value) {
  return Array.isArray(prop) ? prop.includes(value) : prop === value;
}

/**
 * Traverse down in the tree.
 * @note Can't be nested due to its use of implicit `subject`
 */
function within(target, callback) {
  const targets = Array.isArray(target) ? target : [target];

  const traverse = (prop, tree) => (Object.prototype.hasOwnProperty.call(prop, 'termType')
    ? tree.findWhere(e => (e.name() && e.name().startsWith('TP(') && e.instance() && has(e.instance().topology, prop))
      || (e.name() === 'LinkedResourceContainer' && has(e.prop('subject'), prop)))
    : tree.find(prop));

  return callback(targets.reduce((tree, t) => traverse(t, tree), subject));
}

export {
  argUnit,
  as,
  createContext,
  declareProps,
  defineMarker,
  describeView,
  list,
  seq,
  marker,
  normalizeProps,
  setProp,
  within,
};
