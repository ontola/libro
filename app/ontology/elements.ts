import { createNS } from '@ontologies/core';

const elements = createNS('https://ns.ontola.io/elements#');

export default {
  ns: elements,

  /* === Classes === */
  // eslint-disable-next-line sort-keys
  A: elements('A'),
  Document: elements('Document'),
  H1: elements('H1'),
  H2: elements('H2'),
  H3: elements('H3'),
  H4: elements('H4'),
  H5: elements('H5'),
  H6: elements('H6'),
  Img: elements('Img'),
  InnerText: elements('InnerText'),
  Li: elements('Li'),
  Note: elements('Note'),
  Ol: elements('Ol'),
  P: elements('P'),
  Tip: elements('Tip'),
  Ul: elements('Ul'),
  Video: elements('Video'),

  /* === Properties === */
  // eslint-disable-next-line sort-keys
  align: elements('align'),
  bold: elements('bold'),
  children: elements('children'),
  italic: elements('italic'),
  underline: elements('underline'),
};
