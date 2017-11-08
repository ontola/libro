/* globals $r, dev */
/* eslint no-console: 0 */

import { allRDFValues, defaultNS } from 'link-lib';
import {
  LinkedObjectContainer,
  getLinkedObjectProperty,
  getLinkedObjectPropertyRaw,
} from 'link-redux';
import { getLinkedObjectClass } from 'link-redux/dist/module/react/components/Property';
import { expandedProperty } from 'link-redux/dist/module/react/components/PropertyBase';
import rdf from 'rdflib';

function returnWithError(msg = undefined) {
  return console.error(`${msg ? `${msg}, i` : 'I'}s a link component selected? (check the value of \`$r\`)`);
}

export function getLRS(comp) {
  const lrs = comp.context && comp.context.linkedRenderStore;
  if (typeof lrs === 'undefined') {
    console.warn('Component `linkedRenderStore` is undefined, recovering by using global (you should still fix this)');
  }
  return lrs || window.LRS;
}

export function dataArr() {
  const comp = $r;
  const lrs = getLRS(comp);
  if (typeof comp === 'undefined') {
    console.error('No component selected in react devtools (check the value of `$r`)');
  }
  if (typeof comp.props === 'undefined') {
    return returnWithError('Object has no props');
  }
  let subject = comp.props.object || comp.props.subject;
  if (typeof subject === 'undefined') {
    return returnWithError('No subject or object found (check the value of `$r`)');
  }
  if (typeof subject === 'string') {
    console.debug('Normalizing passed subject into NamedNode');
    subject = new rdf.NamedNode(subject);
  }
  return lrs.tryEntity(subject);
}

export function showProp(func) {
  return () => {
    const comp = $r;
    if (typeof comp === 'undefined') {
      console.error('No component selected in react devtools (check the value of `$r`)');
    }
    if (typeof comp.props === 'undefined') {
      return returnWithError('Object has no props');
    }
    if (typeof comp.props.label === 'undefined') {
      return returnWithError('Component `label` is undefined');
    }
    if (typeof comp.props.subject === 'undefined') {
      return returnWithError('Component `subject` is undefined');
    }
    const lrs = getLRS(comp);

    console.debug('Using: ', comp.props.label, comp.props.subject, lrs ? 'local LRS' : 'global LRS');
    return func(comp.props.label, comp.props.subject, lrs);
  };
}

export function toObject(arr) {
  if (!Array.isArray(arr)) {
    console.error('Pass an array of statements to process');
  }
  if (arr.length === 0) {
    console.debug('No statements passed');
    return {};
  }
  const obj = {};
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i];
    const subj = cur.subject.toString();
    const pred = cur.predicate.toString();
    if (typeof obj[subj] === 'undefined') {
      obj[subj] = {
        get types() {
          return this[defaultNS.rdf('type')];
        }
      };
    }
    if (typeof obj[subj][pred] === 'undefined') {
      obj[subj][pred] = cur.object;
    } else if (Array.isArray(obj[subj][pred])) {
      obj[subj][pred].push(cur.object);
    } else {
      obj[subj][pred] = [
        obj[subj][pred],
        cur.object,
      ];
    }
  }
  const allKeys = Object.keys(obj);
  if (allKeys.length === 1) {
    console.debug('Returning single subject;', allKeys[0]);
    return obj[allKeys[0]];
  }
  return obj;
}

export const data = () => toObject(dataArr());
export const getPropArr = showProp(getLinkedObjectProperty);
export const getPropRawArr = showProp(getLinkedObjectPropertyRaw);
export const getProp = () => {
  const propVal = getPropArr();
  return Array.isArray(propVal) ? toObject(propVal) : propVal;
};
export const getPropRaw = () => {
  const propVal = getPropRawArr();
  return Array.isArray(propVal) ? toObject(propVal) : propVal;
};


function explainLOC(comp, lrs) {
  console.info('Component seems an LOC');
  console.debug('(get all known type renderers through `dev.typeRenderers`)');
  if (comp.props.forceRender) {
    if (comp.props.children) {
      return console.info('forceRender was used with children; rendering a div containing the children.');
    }
    console.debug('Detected forceRender, but no children were given, continuing.');
  }
  const compData = comp.data();
  if (LinkedObjectContainer.hasData(compData)) {
    const cause = compData === 'undefined' ? 'Component has no data' : 'Component has too little data';
    console.info(cause);
    console.debug('Resolved data;', compData);
    if (comp.onLoad()) {
      console.info('Loading component was resolved and will be rendered');
      return console.debug('Resolved loading component;', comp.onLoad());
    }
    return console.info('No loading component was resolved; rendering `null`');
  }
  if (LinkedObjectContainer.hasErrors(compData)) {
    console.info('The object is in error state');
    console.debug(getPropArr(defaultNS.http('statusCodeValue')));
    if (comp.onError()) {
      console.info('An error component was resolved; rendering the error component');
      return console.debug('Resolved error component;', comp.onError());
    }
    return console.info('No error component was resolved; rendering `null`');
  }
  if (comp.props.children) {
    return console.info('Children were passed to the component, rendering a div containing the children.');
  }
  const ownObjType = allRDFValues(compData, lrs.namespaces.rdf('type'), true);
  if (!ownObjType) {
    console.debug("Resolved data doesn't contain a type");
  }
  const lrsDefaultType = lrs.defaultType;
  if (!lrsDefaultType) {
    console.debug('No default type in LRS.');
  }
  if (!(ownObjType && lrsDefaultType)) {
    return console.info('Default type not present and no type could be resolved, rendering null.');
  }
  const typeMsg = ownObjType ? 'Continuing with type from data.' : 'Continuing with default type.';
  console.debug(typeMsg, ownObjType || lrsDefaultType);

  const renderClass = lrs.getRenderClassForType(ownObjType || lrsDefaultType, comp.topology());
  console.debug('Requesting class from LRS with topology', comp.topology());
  if (!renderClass) {
    return console.info('No class could be found, rendering no-view div.');
  }
  console.info('Render class was resolved, rendering class with own props.');
  console.debug('Resolved class: ', renderClass);
  return console.debug('Given props: ', comp.props);
}

function explainProperty(comp, lrs) {
  console.info('Component seems a property renderer');
  console.debug('(get all known property renderers through `dev.propertyRenderers`)');
  const val = comp.props.linkedProp || dev.getProp;
  if (comp.props.linkedProp) {
    console.info('Component has a `linkedProp` property. Property value from linkedProp will be used');
  } else {
    console.info('No `linkedProp` is given. Property value will be retrieved from the render store');
  }
  if (typeof val === 'undefined') {
    console.info('The value of the property is `undefined`');
    console.info(`\`forceRender\` prop is ${comp.props.forceRender === true ? 'enabled' : 'disabled'}.`);
    if (!comp.props.forceRender) {
      return console.info("Value is undefined and rendering isn't forced; rendering `null`");
    }
    console.info('Continuing render without a value present');
  }
  console.debug('Found value:', val);
  console.debug(
    'Component lookup will be done with: ',
    allRDFValues(lrs.tryEntity(comp.props.subject), defaultNS.rdf('type'), true),
    expandedProperty(comp.props.label, lrs),
    dev.topology
  );
  const klass = getLinkedObjectClass(comp.props, comp.context);
  if (typeof klass !== 'undefined') {
    console.info(`Component will be rendered with matched class '${klass.name}'`);
    return console.debug('Matched component class reference:', klass);
  }
  console.info('No render class was found (is the property renderer registered?)');
  if (typeof val !== 'undefined') {
    if (val.termType === 'NamedNode') {
      return console.info('Value is an IRI; defaulting to rendering an LOC with object', val.value);
    }
    if (typeof klass === 'undefined') {
      return console.info('Neither the value nor the property renderer is present, but forceRender was given; rendering `null`');
    }
  }
  return console.info('Value is present, but no class could be found; rendering a div with the value');
}

export function explain() {
  const comp = $r;
  const lrs = getLRS(comp);
  /* eslint no-underscore-dangle: 0 */
  const int = comp._reactInternalInstance;
  if (typeof int === 'undefined') returnWithError();
  const name = int.getName();
  console.group(`Explanation for component ${name}`);
  if (name === 'LinkedObjectContainer') {
    explainLOC(comp, lrs);
  } else if (name === 'Property') {
    explainProperty(comp, lrs);
  } else {
    console.warn(`Component seems of unknown type (${name})`);
  }
  lrs.getRenderClassForType(dev.data.types, dev.topology);
  return console.groupEnd();
}

function helpTableObj(method, desc) {
  return {
    desc,
    method,
  };
}

export function showHelp() {
  console.warn('__DO NOT__ USE THESE METHODS IN CODE SINCE ARE NOT PUBLIC, AND ARE FOR DEBUGGING PURPOSES ONLY.');
  console.group('Available object methods for LinkedObjectContainer');
  const LOC = [
    helpTableObj('<<static>> hasData', 'Returns whether the resource is considered to have data'),
    helpTableObj('<<static>> hasErrors', 'Returns whether the resource is considered to be in an error state'),
    helpTableObj('onError', 'Returns the component to render on error'),
    helpTableObj('onLoad', 'Returns the component to render on load'),
    helpTableObj('data', 'Returns the currently available data (real-time, so render-time data theoretically might differ).'),
    helpTableObj('objType', 'Returns the resolved type of the resource, defaults to the lrs value.'),
    helpTableObj('subject', 'Returns the normalized subject of the container'),
    helpTableObj('topology', 'Returns the current topology (or undefined when not present)'),
  ];
  console.table(LOC, ['method', 'desc']);
  console.groupEnd();
  console.info('Property and others are purely functional, so this module exposes additional methods which can be used to inspect those components');
  console.group('Available object methods for devTools (via `dev.<attribute>`)');
  console.info('Most methods work on react-devtools object references (using value of `$r`)');
  const devTools = [
    helpTableObj('hasData', 'Returns whether the resource is considered to have data'),
    helpTableObj('data', 'Returns the currently available data as an object (real-time, so render-time data theoretically might differ).'),
    helpTableObj('dataArr', 'Returns the raw currently available data (See also; `data`).'),
    helpTableObj('explain', 'Renders the sequence of decisions made by the component for rendering'),
    helpTableObj('getLinkedObjectProperty()', "Exposes link-redux's `getLinkedObjectProperty` method (used by `Property` and `PropertyBase`)."),
    helpTableObj('getLinkedObjectPropertyRaw()', "Exposes link-redux's `getLinkedObjectProperty` method (used by `Property` and `PropertyBase`)."),
    helpTableObj('getPropArr', "Returns the component's 'object property' without using `toObject`."),
    helpTableObj('getPropRawArr', "Returns the component's 'object property' without using `toObject`."),
    helpTableObj('getProp', "Returns the component's formatted 'object property' by using `getLinkedObjectProperty`."),
    helpTableObj('getPropRaw', "Returns the component's formatted 'object property' by using `getLinkedObjectPropertyRaw`."),
    helpTableObj('help', 'Displays this help message.'),
    helpTableObj('toObject(arr)', 'Converts an array of statements to an object.'),
    helpTableObj('topology', "Returns the current location's topology."),
    helpTableObj('types', ''),
    helpTableObj('typeRenderers', 'Returns all registered type renderers.'),
    helpTableObj('propertyRenderers', 'Returns all registered property renderers (including type renderers).'),
  ];
  console.table(devTools, ['method', 'desc']);
  console.groupEnd();
}

const devObj = {
  get data() { return data(); },
  get dataArr() { return dataArr(); },
  get explain() { return explain(); },
  get getLinkedObjectProperty() { return getLinkedObjectProperty(); },
  get getLinkedObjectPropertyRaw() { return getLinkedObjectPropertyRaw(); },
  get getProp() { return getProp(); },
  get getPropArr() { return getPropArr(); },
  get getPropRaw() { return getPropRaw(); },
  get getPropRawArr() { return getPropRawArr(); },
  get help() { return showHelp(); },
  get propertyRenderers() { return getLRS($r).mapping; },
  toObject,
  get topology() {
    return $r.props.topology === null ? undefined : ($r.props.topology || $r.context.topology);
  },
  get typeRenderers() { return getLRS($r).mapping['<http://purl.org/link-lib/typeRenderClass>']; },
  get types() { return undefined; },
};

export default devObj;

if (typeof window !== 'undefined') {
  window.dev = devObj;
}
