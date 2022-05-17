import Code from '@material-ui/icons/Code';
import {
  CodeBlockPluginOptions,
  ELEMENT_CODE_BLOCK,
  CodeBlockPlugin as codeBlockPluginBase,
} from '@udecode/slate-plugins';
import React from 'react';

import { Command, Commands } from '../../commands';
import { ElementButton } from '../../components/ElementButton';
import { ButtonOptions, CommandPlugin } from '../types';

export const CODE_BLOCK_COMMAND_KEY = 'formatCodeBlock';

export interface CodeBlockCommands extends Commands {
  [CODE_BLOCK_COMMAND_KEY]: Command;
}

export type CodeBlockCommandPlugin = CommandPlugin<CodeBlockCommands>;

export type CodeBlockCommandPluginOptions = CodeBlockPluginOptions & {
  code_block: ButtonOptions;
};

export const CodeBlockPlugin = (options?: CodeBlockCommandPluginOptions): CodeBlockCommandPlugin => ({
  ...codeBlockPluginBase(options),
  commands: {
    [CODE_BLOCK_COMMAND_KEY]: {
      button:
  <ElementButton
    id={CODE_BLOCK_COMMAND_KEY}
    key={CODE_BLOCK_COMMAND_KEY}
    title={options?.code_block.buttonTitle || 'Code block'}
    type={options?.code_block?.type || ELEMENT_CODE_BLOCK}
  >
    <Code />
  </ElementButton>,
    },
  },
});
