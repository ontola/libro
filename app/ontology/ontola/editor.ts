import rdf, { createNS } from '@ontologies/core';

const editor = createNS('https://ns.ontola.io/editor/');

export default {
  ns: editor,

  /* Classes */
  Action: editor('Action'),
  Divider: editor('Divider'),
  Document: editor('Document'),
  EditorSettings: editor('EditorSettings'),
  Shortcut: editor('Shortcut'),
  elements: {
    h1: editor('elements/h1'),
    h2: editor('elements/h2'),
    h3: editor('elements/h3'),
    h4: editor('elements/h4'),
    inline: editor('elements/inline'),
    link: editor('elements/link'),
    listItem: editor('elements/listItem'),
    orderedList: editor('elements/orderedList'),
    paragraph: editor('elements/paragraph'),
    resource: editor('elements/resource'),
    unorderedList: editor('elements/unorderedList'),
  },
  formatting: {
    Bold: editor('formatting/Bold'),
    Italic: editor('formatting/Italic'),
    Underline: editor('formatting/Underline'),
  },
  listTypes: [ editor('elements/orderedList'), editor('elements/unorderedList') ],
  styles: {
    h1: editor('styles/h1'),
    h2: editor('styles/h2'),
    h3: editor('styles/h3'),
    h4: editor('styles/h4'),
    paragraph: editor('styles/paragraph'),
    subtitle: editor('styles/subtitle'),
    title: editor('styles/title'),
  },

  /* Properties */
  current: editor('current'),
  defaultCombination: editor('defaultCombination'),
  enabledPlugins: editor('enabledPlugins'),
  /** The mark of an action */
  mark: editor('mark'),
  /** Currently activated marks */
  marks: editor('marks'),
  shortcut: editor('shortcut'),
  shortcuts: editor('shortcuts'),
  toolbar: editor('toolbar'),

  /* Individuals */
  actions: {
    changeType: editor('actions/changeType'),
    tab: editor('actions/tab'),
    shiftLineDown: editor('actions/shiftLineDown'),
    shiftLineUp: editor('actions/shiftLineUp'),
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
  paragraphStyleSelector: editor('paragraphStyleSelector'),
};
