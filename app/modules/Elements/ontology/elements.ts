import { createNS } from '@ontologies/core';

const elements = createNS('https://ns.ontola.io/elements#');

export default {
  ns: elements,

  /* === Classes === */
  // eslint-disable-next-line sort-keys
  A: elements('A'),
  ActionItem: elements('ActionItem'),
  Blockquote: elements('Blockquote'),
  Button: elements('Button'),
  Document: elements('Document'),
  Grid: elements('Grid'),
  H1: elements('H1'),
  H2: elements('H2'),
  H3: elements('H3'),
  H4: elements('H4'),
  H5: elements('H5'),
  H6: elements('H6'),
  Img: elements('Img'),
  InnerText: elements('InnerText'),
  Li: elements('Li'),
  Lic: elements('Lic'),
  Note: elements('Note'),
  Ol: elements('Ol'),
  P: elements('P'),
  Row: elements('Row'),
  Spacer: elements('Spacer'),
  Span: elements('Span'),
  Tip: elements('Tip'),
  Ul: elements('Ul'),
  Video: elements('Video'),

  /* === Properties === */
  // eslint-disable-next-line sort-keys
  align: elements('align'),
  backgroundColor: elements('backgroundColor'),
  bold: elements('bold'),
  caption: elements('caption'),
  checked: elements('checked'),
  children: elements('children'),
  color: elements('color'),
  float: elements('float'),
  gap: elements('gap'),
  href: elements('href'),
  iconPosition: elements('iconPosition'),
  indent: elements('indent'),
  italic: elements('italic'),
  minWidth: elements('minWidth'),
  underline: elements('underline'),
  variant: elements('variant'),
  width: elements('width'),
};
