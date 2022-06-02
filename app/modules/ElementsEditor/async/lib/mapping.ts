import rdf from '@ontologies/core';
import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_IMAGE,
  ELEMENT_LI,
  ELEMENT_LIC,
  ELEMENT_LINK,
  ELEMENT_OL,
  ELEMENT_PARAGRAPH,
  ELEMENT_TODO_LI,
  ELEMENT_UL,
} from '@udecode/plate';

import elements from '../../../../ontology/elements';
import ontola from '../../../../ontology/ontola';
import { ELEMENT_BUTTON } from '../components/plugins/button';
import { ELEMENT_GRID } from '../components/plugins/grid';
import { ELEMENT_NOTE } from '../components/plugins/note';
import { ELEMENT_ROW } from '../components/plugins/row';
import { ELEMENT_TIP } from '../components/plugins/tip';

/**
 * Element types implemented in Plate
 */
const plateElements = {
  [elements.A.value]: ELEMENT_LINK,
  [elements.ActionItem.value]: ELEMENT_TODO_LI,
  [elements.Blockquote.value]: ELEMENT_BLOCKQUOTE,
  ['component:Button']: 'component:Button',
  [elements.H1.value]: ELEMENT_H1,
  [elements.H2.value]: ELEMENT_H2,
  [elements.H3.value]: ELEMENT_H3,
  [elements.H4.value]: ELEMENT_H4,
  [elements.H5.value]: ELEMENT_H5,
  [elements.H6.value]: ELEMENT_H6,
  [elements.Li.value]: ELEMENT_LI,
  [elements.Lic.value]: ELEMENT_LIC,
  [elements.Ol.value]: ELEMENT_OL,
  [elements.P.value]: ELEMENT_PARAGRAPH,
  [elements.Ul.value]: ELEMENT_UL,
};

/**
 * Element types implemented in Plate, but being mapped to custom datastructures.
 */
const plateElementsCustomDataRepresentation = {
  [ontola.PictureSet.value]: ELEMENT_IMAGE,
};

export const elementsMap = {
  ...plateElements,
  ...plateElementsCustomDataRepresentation,
  [elements.Button.value]: ELEMENT_BUTTON,
  [elements.Grid.value]: ELEMENT_GRID,
  [elements.Note.value]: ELEMENT_NOTE,
  [elements.Row.value]: ELEMENT_ROW,
  [elements.Tip.value]: ELEMENT_TIP,
  ['component:Button']: 'component:Button',
};

const plateElementsInverseMap = {
  [ELEMENT_BLOCKQUOTE]: elements.Blockquote,
  [ELEMENT_H1]: elements.H1,
  [ELEMENT_H2]: elements.H2,
  [ELEMENT_H3]: elements.H3,
  [ELEMENT_H4]: elements.H4,
  [ELEMENT_H5]: elements.H5,
  [ELEMENT_H6]: elements.H6,
  [ELEMENT_LI]: elements.Li,
  [ELEMENT_LIC]: elements.Lic,
  [ELEMENT_LINK]: elements.A,
  [ELEMENT_OL]: elements.Ol,
  [ELEMENT_PARAGRAPH]: elements.P,
  [ELEMENT_TODO_LI]: elements.ActionItem,
  [ELEMENT_UL]: elements.Ul,
};
const plateElementsInverseMapCustomDataRepresentation = {
  [ELEMENT_IMAGE]: ontola.PictureSet,
};

export const elementsInverseMap = {
  ...plateElementsInverseMap,
  ...plateElementsInverseMapCustomDataRepresentation,
  [ELEMENT_BUTTON]: elements.Button,
  [ELEMENT_GRID]: elements.Grid,
  [ELEMENT_NOTE]: elements.Note,
  [ELEMENT_ROW]: elements.Row,
  [ELEMENT_TIP]: elements.Tip,
  'component:Button': rdf.namedNode('component:Button'),
};

