import {
  DEFAULTS_BOLD,
  DEFAULTS_CODE_BLOCK,
  DEFAULTS_HEADING,
  DEFAULTS_IMAGE,
  DEFAULTS_ITALIC,
  DEFAULTS_LINK,
  DEFAULTS_LIST,
  DEFAULTS_PARAGRAPH,
  DEFAULTS_UNDERLINE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_PARAGRAPH,
  ExitBreakPluginOptions,
  ResetBlockTypePluginOptions,
  SoftBreakPluginOptions,
  WithToggleTypeOptions,
  WithTrailingNode,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
} from '@udecode/slate-plugins';

import {
  HeadingCommandPluginOptions,
  CodeBlockPlugin as codeBlockPlugin,
  headingPlugin,
  imagePlugin,
  linkPlugin,
  listPlugin,
  paragraphPlugin,
} from './elements';
import {
  inlineVoidPlugin,
  toggleTypePlugin,
  trailingNodePlugin,
  transformsPlugin,
} from './extensions';
import {
  exitBreakPlugin,
  resetBlockTypePlugin,
  softBreakPlugin,
} from './handlers';
import {
  boldPlugin,
  italicPlugin,
  underlinePlugin,
} from './marks';
import { DefaultCommandPlugins, DefaultCommandPluginsOptions } from './types';

const exitBreakPluginOptions: ExitBreakPluginOptions = {
  rules: [
    {
      hotkey: 'mod+enter',
    },
    {
      before: true,
      hotkey: 'mod+shift+enter',
    },
    {
      hotkey: 'enter',
      query: {
        allow: [
          ELEMENT_H1,
          ELEMENT_H2,
          ELEMENT_H3,
        ],
        end: true,
        start: true,
      },
    },
  ],
};

const resetBlockTypesCommonRule = {
  defaultType: DEFAULTS_PARAGRAPH.p?.type,
  types: [
    ELEMENT_CODE_BLOCK,
  ],
};

const resetBlockTypePluginOptions: ResetBlockTypePluginOptions = {
  rules: [
    {
      ...resetBlockTypesCommonRule,
      hotkey: 'Enter',
      predicate: isBlockAboveEmpty,
    },
    {
      ...resetBlockTypesCommonRule,
      hotkey: 'Backspace',
      predicate: isSelectionAtBlockStart,
    },
  ],
};

const softBreakPluginOptions: SoftBreakPluginOptions = {
  rules: [
    { hotkey: 'shift+enter' },
    {
      hotkey: 'enter',
      query: {
        allow: [
          ELEMENT_CODE_BLOCK,
        ],
      },
    },
  ],
};

const toggleTypePluginOptions: WithToggleTypeOptions = {
  defaultType: ELEMENT_PARAGRAPH,
};

const trailingNodePluginOptions: WithTrailingNode = {
  type: ELEMENT_PARAGRAPH,
};

export const defaultPluginsOptions: DefaultCommandPluginsOptions = {
  bold: DEFAULTS_BOLD,
  codeBlock: DEFAULTS_CODE_BLOCK,
  exitBreak: exitBreakPluginOptions,
  heading: DEFAULTS_HEADING as HeadingCommandPluginOptions,
  image: DEFAULTS_IMAGE,
  italic: DEFAULTS_ITALIC,
  link: DEFAULTS_LINK,
  list: DEFAULTS_LIST,
  paragraph: DEFAULTS_PARAGRAPH,
  resetBlockType: resetBlockTypePluginOptions,
  softBreak: softBreakPluginOptions,
  toggleType: toggleTypePluginOptions,
  trailingNode: trailingNodePluginOptions,
  underline: DEFAULTS_UNDERLINE,
};

export const getDefaultPlugins = (options: DefaultCommandPluginsOptions): DefaultCommandPlugins => {
  const plugins: DefaultCommandPlugins = {
    bold: boldPlugin(options.bold),
    codeBlock: codeBlockPlugin(options.codeBlock),
    exitBreak: exitBreakPlugin(options.exitBreak),
    heading: headingPlugin(options.heading),
    image: imagePlugin(options.image),
    inlineVoid: inlineVoidPlugin,
    italic: italicPlugin(options.italic),
    link: linkPlugin(options.link),
    list: listPlugin(options.list),
    paragraph: paragraphPlugin(options.paragraph),
    resetBlockType: resetBlockTypePlugin(options.resetBlockType),
    softBreak: softBreakPlugin(options.softBreak),
    toggleType: toggleTypePlugin(options.toggleType),
    trailingNode: trailingNodePlugin(options.trailingNode),
    transforms: transformsPlugin,
    underline: underlinePlugin(options.underline),
  };

  // Button order
  plugins.bold.commands.formatBold.buttonIndex = 100;
  plugins.italic.commands.formatItalic.buttonIndex = 110;
  plugins.underline.commands.formatUnderline.buttonIndex = 120;
  plugins.heading.commands.formatHeading1.buttonIndex = 200;
  plugins.heading.commands.formatHeading2.buttonIndex = 210;
  plugins.heading.commands.formatHeading3.buttonIndex = 220;
  plugins.list.commands.formatListOrdered.buttonIndex = 300;
  plugins.list.commands.formatListUnordered.buttonIndex = 310;
  plugins.codeBlock.commands.formatCodeBlock.buttonIndex = 350;
  plugins.link.commands.insertLink.buttonIndex = 400;
  plugins.image.commands.insertImage.buttonIndex = 500;

  return plugins;
};

export const defaultPlugins: DefaultCommandPlugins = getDefaultPlugins(defaultPluginsOptions);
