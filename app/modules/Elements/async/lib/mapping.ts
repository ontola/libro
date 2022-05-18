import rdf from '@ontologies/core';

import elements from '../../../../ontology/elements';

export const elementsMap = {
  [elements.A.value]: 'a',
  [elements.Tip.value]: 'code',
  ['component:Button']: 'component:Button',
  [elements.H1.value]: 'h1',
  [elements.H2.value]: 'h2',
  [elements.H3.value]: 'h3',
  [elements.H4.value]: 'h4',
  [elements.H5.value]: 'h5',
  [elements.H6.value]: 'h6',
  [elements.Img.value]: 'img',
  [elements.Li.value]: 'li',
  [elements.Ol.value]: 'ol',
  [elements.P.value]: 'p',
  [elements.Ul.value]: 'ul',
};

export const elementsInverseMap = {
  'a': elements.A,
  'code': elements.Tip,
  'component:Button': rdf.namedNode('component:Button'),
  'h1': elements.H1,
  'h2': elements.H2,
  'h3': elements.H3,
  'h4': elements.H4,
  'h5': elements.H5,
  'h6': elements.H6,
  'img': elements.Img,
  'li': elements.Li,
  'ol': elements.Ol,
  'p': elements.P,
  'ul': elements.Ul,
};

