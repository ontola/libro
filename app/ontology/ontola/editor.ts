import rdf, { createNS } from '@ontologies/core';

const editor = createNS('https://ns.ontola.io/editor/');

export default {
  ns: editor,

  /* Classes */
  Divider: editor('Divider'),
  Document: editor('Document'),
  EditorSettings: editor('EditorSettings'),
  elements: {
    H1: editor('elements/H1'),
    H2: editor('elements/H2'),
    H3: editor('elements/H3'),
    H4: editor('elements/H4'),
    Link: editor('elements/Link'),
    Paragraph: editor('elements/Paragraph'),
    Resource: editor('elements/Resource'),
  },
  formatting: {
    Bold: editor('formatting/Bold'),
    Italic: editor('formatting/Italic'),
    Underline: editor('formatting/Underline'),
  },

  /* Properties */
  current: editor('current'),
  enabledPlugins: editor('enabledPlugins'),
  /** The mark of an action */
  mark: editor('mark'),
  /** Currently activated marks */
  marks: editor('marks'),
  toolbar: editor('toolbar'),

  /* Individuals */
  actions: {
    changeType: editor('actions/changeType'),
    toggleMark: editor('actions/toggleMark'),
  },
  divider: editor('divider'),
  features: {
    alignment: editor('plugins/alignment'),
    bold: editor('plugins/bold'),
    color: editor('plugins/color'),
    embed: editor('plugins/embed'),
    fontFamily: editor('plugins/fontFamily'),
    fontSize: editor('plugins/fontSize'),
    grid: editor('plugins/grid'),
    image: editor('plugins/image'),
    italic: editor('plugins/italic'),
    link: editor('plugins/link'),
    list: editor('plugins/list'),
    strikethrough: editor('plugins/strikethrough'),
    underline: editor('plugins/underline'),
  },
  localSettings: rdf.blankNode(),
};
