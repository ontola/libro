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
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  ResetBlockTypePluginOptions,
  SoftBreakPluginOptions,
  WithToggleTypeOptions,
  WithTrailingNode,
} from '@udecode/slate-plugins';

import {
  CodeBlockPlugin,
  HeadingPlugin,
  ImagePlugin,
  LinkPlugin,
  ListPlugin,
  ParagraphPlugin,
} from './elements';

import {
  InlineVoidPlugin,
  ToggleTypePlugin,
  TrailingNodePlugin,
  TransformsPlugin,
} from './extensions';

import { ExitBreakPlugin, ResetBlockTypePlugin, SoftBreakPlugin } from './handlers';

import { BoldPlugin } from './marks';
import { ItalicPlugin } from './marks';
import { UnderlinePlugin } from './marks';

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
  // @ts-ignore
  heading: DEFAULTS_HEADING,
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
    bold: BoldPlugin(options.bold),
    codeBlock: CodeBlockPlugin(options.codeBlock),
    exitBreak: ExitBreakPlugin(options.exitBreak),
    heading: HeadingPlugin(options.heading),
    image: ImagePlugin(options.image),
    inlineVoid: InlineVoidPlugin,
    italic: ItalicPlugin(options.italic),
    link: LinkPlugin(options.link),
    list: ListPlugin(options.list),
    paragraph: ParagraphPlugin(options.paragraph),
    resetBlockType: ResetBlockTypePlugin(options.resetBlockType),
    softBreak: SoftBreakPlugin(options.softBreak),
    toggleType: ToggleTypePlugin(options.toggleType),
    trailingNode: TrailingNodePlugin(options.trailingNode),
    transforms: TransformsPlugin,
    underline: UnderlinePlugin(options.underline),
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
