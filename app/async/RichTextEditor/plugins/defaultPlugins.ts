import {
  BoldPluginOptions,
  CodeBlockPluginOptions,
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
  ExitBreakPluginOptions,
  HeadingPluginOptions,
  ImagePluginOptions,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  ItalicPluginOptions,
  LinkPluginOptions,
  ListPluginOptions,
  ParagraphPluginOptions,
  ResetBlockTypePluginOptions,
  SoftBreakPluginOptions,
  UnderlinePluginOptions,
  WithToggleTypeOptions,
  WithTrailingNode,
} from '@udecode/slate-plugins';

import { CodeBlockPlugin } from './elements/CodeBlockPlugin';
import { HeadingPlugin } from './elements/HeadingPlugin';
import { ImagePlugin } from './elements/ImagePlugin';
import { LinkPlugin } from './elements/LinkPlugin';
import { ListPlugin } from './elements/ListPlugin';
import { ParagraphPlugin } from './elements/ParagraphPlugin';

import { InlineVoidPlugin } from './extensions/InlineVoidPlugin';
import { ToggleTypePlugin } from './extensions/ToggleTypePlugin';
import { TrailingNodePlugin } from './extensions/TrailingNodePlugin';
import { TransformsPlugin } from './extensions/TransformsPlugin';

import { ExitBreakPlugin } from './handlers/ExitBreakPlugin';
import { ResetBlockTypePlugin } from './handlers/ResetBlockTypePlugin';
import { SoftBreakPlugin } from './handlers/SoftBreakPlugin';

import { BoldPlugin } from './marks/BoldPlugin';
import { ItalicPlugin } from './marks/ItalicPlugin';
import { UnderlinePlugin } from './marks/UnderlinePlugin';
import { CommandPlugins } from './types';

const boldPluginOptions: BoldPluginOptions = DEFAULTS_BOLD;

const codeBlockPluginOptions: CodeBlockPluginOptions = DEFAULTS_CODE_BLOCK;

const italicPluginOptions: ItalicPluginOptions = DEFAULTS_ITALIC;

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

const headingPluginOptions: HeadingPluginOptions = DEFAULTS_HEADING;

const imagePluginOptions: ImagePluginOptions = DEFAULTS_IMAGE;

const linkPluginOptions: LinkPluginOptions = DEFAULTS_LINK;

const listPluginOptions: ListPluginOptions = DEFAULTS_LIST;

const paragraphPluginOptions: ParagraphPluginOptions = DEFAULTS_PARAGRAPH;

const resetBlockTypesCommonRule = {
  defaultType: paragraphPluginOptions.p?.type,
  types: [
    codeBlockPluginOptions.code_block?.type || ELEMENT_CODE_BLOCK,
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
          codeBlockPluginOptions.code_block?.type || ELEMENT_CODE_BLOCK,
        ],
      },
    },
  ],
};

const toggleTypePluginOptions: WithToggleTypeOptions = {
  defaultType: paragraphPluginOptions.p?.type,
};

const trailingNodePluginOptions: WithTrailingNode = {
  type: paragraphPluginOptions.p?.type,
};

const underlinePluginOptions: UnderlinePluginOptions = DEFAULTS_UNDERLINE;

export const defaultPlugins: CommandPlugins = {
  bold: BoldPlugin(boldPluginOptions),
  codeBlock: CodeBlockPlugin(codeBlockPluginOptions),
  exitBreak: ExitBreakPlugin(exitBreakPluginOptions),
  heading: HeadingPlugin(headingPluginOptions),
  image: ImagePlugin(imagePluginOptions),
  inlineVoid: InlineVoidPlugin,
  italic: ItalicPlugin(italicPluginOptions),
  link: LinkPlugin(linkPluginOptions),
  list: ListPlugin(listPluginOptions),
  paragraph: ParagraphPlugin(paragraphPluginOptions),
  resetBlockType: ResetBlockTypePlugin(resetBlockTypePluginOptions),
  softBreak: SoftBreakPlugin(softBreakPluginOptions),
  toggleType: ToggleTypePlugin(toggleTypePluginOptions),
  trailingNode: TrailingNodePlugin(trailingNodePluginOptions),
  transforms: TransformsPlugin,
  underline: UnderlinePlugin(underlinePluginOptions),
};

// Editor extension order
defaultPlugins.transforms!.extendEditorIndex = 100;
defaultPlugins.trailingNode!.extendEditorIndex = 200;

// Button order
defaultPlugins.bold!.commands!.formatBold!.buttonIndex = 100;
defaultPlugins.italic!.commands!.formatItalic!.buttonIndex = 110;
defaultPlugins.underline!.commands!.formatUnderline!.buttonIndex = 120;
defaultPlugins.heading!.commands!.formatHeading1!.buttonIndex = 200;
defaultPlugins.heading!.commands!.formatHeading2!.buttonIndex = 210;
defaultPlugins.heading!.commands!.formatHeading3!.buttonIndex = 220;
defaultPlugins.list!.commands!.formatListOrdered!.buttonIndex = 300;
defaultPlugins.list!.commands!.formatListUnordered!.buttonIndex = 310;
defaultPlugins.codeBlock!.commands!.formatCodeBlock!.buttonIndex = 350;
defaultPlugins.link!.commands!.insertLink!.buttonIndex = 400;
defaultPlugins.image!.commands!.insertImage!.buttonIndex = 500;
