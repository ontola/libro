import { createNS } from '@ontologies/core';

const ontola = createNS('https://ns.ontola.io/view#');

export default {
  ns: ontola,

  /* classes */
  Component: ontola('Component'),
  Property: ontola('Property'),
  Resource: ontola('Resource'),
  Topology: ontola('Topology'),
  View: ontola('View'),

  /* properties */
  children: ontola('children'),
  component: ontola('component'),
  property: ontola('property'),
  props: ontola('props'),
};
