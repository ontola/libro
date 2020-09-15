import {
  CodeBlockPluginOptions as CodeBlockPluginOptionsBase,
  ExitBreakPluginOptions,
  HeadingPluginOptions as HeadingPluginOptionsBase,
  ImagePluginOptions as ImagePluginOptionsBase,
  LinkPluginOptions as LinkPluginOptionsBase,
  ParagraphPluginOptions as ParagraphPluginOptionsBase,
  ResetBlockTypePluginOptions,
  SlatePlugin,
  SoftBreakPluginOptions,
  WithToggleTypeOptions,
  WithTrailingNode,
} from '@udecode/slate-plugins';
import { Editor } from 'slate';

import { Commands } from '../commands/types';
import { CodeBlockCommandPlugin, CodeBlockCommandPluginOptions } from './elements/CodeBlockPlugin';
import { HeadingCommandPlugin, HeadingCommandPluginOptions } from './elements/HeadingPlugin';
import { ImageCommandPlugin, ImageCommandPluginOptions } from './elements/ImagePlugin';
import { LinkCommandPlugin, LinkCommandPluginOptions } from './elements/LinkPlugin';
import { ListCommandPlugin, ListCommandPluginOptions } from './elements/ListPlugin';
import { BoldCommandPlugin, BoldCommandPluginOptions } from './marks/BoldPlugin';
import { ItalicCommandPlugin, ItalicCommandPluginOptions } from './marks/ItalicPlugin';
import { UnderlineCommandPlugin, UnderlineCommandPluginOptions } from './marks/UnderlinePlugin';

export interface CommandPlugin<C extends Commands = Commands> extends SlatePlugin {
  commands: C;
  extendEditor?: <T extends Editor>(editor: T) => T;
}

export interface CommandPlugins {
  [name: string]: CommandPlugin;
}

export interface DefaultCommandPlugins {
  bold: BoldCommandPlugin;
  codeBlock: CodeBlockCommandPlugin;
  exitBreak: CommandPlugin;
  heading: HeadingCommandPlugin;
  image: ImageCommandPlugin;
  inlineVoid: CommandPlugin;
  italic: ItalicCommandPlugin;
  link: LinkCommandPlugin;
  list: ListCommandPlugin;
  paragraph: CommandPlugin;
  resetBlockType: CommandPlugin;
  softBreak: CommandPlugin;
  toggleType: CommandPlugin;
  trailingNode: CommandPlugin;
  transforms: CommandPlugin;
  underline: UnderlineCommandPlugin;
  [name: string]: CommandPlugin;
}

export interface ElementOptions {
  title?: string;
}

export interface MarkOptions {
  title?: string;
}

export type CodeBlockPluginOptions = CodeBlockPluginOptionsBase & ElementOptions;
export type HeadingPluginOptions = HeadingPluginOptionsBase & ElementOptions;
export type ImagePluginOptions = ImagePluginOptionsBase & ElementOptions;
export type LinkPluginOptions = LinkPluginOptionsBase & ElementOptions;
export type ParagraphPluginOptions = ParagraphPluginOptionsBase & ElementOptions;

export interface DefaultCommandPluginsOptions {
  bold: BoldCommandPluginOptions;
  codeBlock: CodeBlockCommandPluginOptions;
  exitBreak: ExitBreakPluginOptions;
  heading: HeadingCommandPluginOptions;
  image: ImageCommandPluginOptions;
  italic: ItalicCommandPluginOptions;
  link: LinkCommandPluginOptions;
  list: ListCommandPluginOptions;
  paragraph: ParagraphPluginOptions;
  resetBlockType: ResetBlockTypePluginOptions;
  softBreak: SoftBreakPluginOptions;
  toggleType: WithToggleTypeOptions;
  trailingNode: WithTrailingNode;
  underline: UnderlineCommandPluginOptions;
}

export interface ButtonOptions {
  buttonTitle?: string;
}

export interface InputDialogOptions {
  dialogButtonCancel?: string;
  dialogButtonOK?: string;
  dialogText?: string;
  dialogTitle?: string;
}
