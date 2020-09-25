import {
  BoldPluginOptions,
  CodeBlockPluginOptions,
  ExitBreakPluginOptions,
  HeadingPluginOptions,
  ImagePluginOptions,
  ItalicPluginOptions,
  LinkPluginOptions,
  ListPluginOptions,
  ParagraphPluginOptions,
  ResetBlockTypePluginOptions,
  SlatePlugin,
  SoftBreakPluginOptions,
  UnderlinePluginOptions,
  WithInlineVoidOptions,
  WithToggleTypeOptions,
  WithTrailingNode,
} from '@udecode/slate-plugins';
import { Editor } from 'slate';

import { Commands } from '../commands/types';
import { CodeBlockCommandPlugin } from './elements/CodeBlockPlugin';
import { HeadingCommandPlugin } from './elements/HeadingPlugin';
import { ImageCommandPlugin } from './elements/ImagePlugin';
import { LinkCommandPlugin } from './elements/LinkPlugin';
import { ListCommandPlugin } from './elements/ListPlugin';
import { BoldCommandPlugin } from './marks/BoldPlugin';
import { ItalicCommandPlugin } from './marks/ItalicPlugin';
import { UnderlineCommandPlugin } from './marks/UnderlinePlugin';

export interface CommandPlugin extends SlatePlugin {
  commands?: Commands;
  extendEditor?: <T extends Editor>(editor: T) => T;
}

export interface CommandPlugins {
  bold?: BoldCommandPlugin;
  codeBlock?: CodeBlockCommandPlugin;
  exitBreak?: CommandPlugin;
  heading?: HeadingCommandPlugin;
  image?: ImageCommandPlugin;
  inlineVoid?: CommandPlugin;
  italic?: ItalicCommandPlugin;
  link?: LinkCommandPlugin;
  list?: ListCommandPlugin;
  paragraph?: CommandPlugin;
  resetBlocktype?: CommandPlugin;
  softBreak?: CommandPlugin;
  toggleType?: CommandPlugin;
  trailingNode?: CommandPlugin;
  transforms?: CommandPlugin;
  underline?: UnderlineCommandPlugin;
  [name: string]: CommandPlugin | undefined;
}

export interface CommandPluginsOptions {
  bold?: BoldPluginOptions;
  codeBlock?: CodeBlockPluginOptions;
  exitBreak?: ExitBreakPluginOptions;
  heading?: HeadingPluginOptions;
  image?: ImagePluginOptions;
  inlineVoid?: WithInlineVoidOptions;
  italic?: ItalicPluginOptions;
  link?: LinkPluginOptions;
  list?: ListPluginOptions;
  paragraph?: ParagraphPluginOptions;
  resetBlocktype?: ResetBlockTypePluginOptions;
  softBreak?: SoftBreakPluginOptions;
  toggleType?: WithToggleTypeOptions;
  trailingNode?: WithTrailingNode;
  underline?: UnderlinePluginOptions;
  [name: string]: any;
}
