import { Code } from '@material-ui/icons';
import { CodeBlockPlugin as CodeBlockPluginBase, CodeBlockPluginOptions, ELEMENT_CODE_BLOCK } from '@udecode/slate-plugins';
import React from 'react';

import { Command, Commands } from '../../commands/types';
import { getButtonElement } from '../../utils/getButtonElement';
import { CommandPlugin } from '../types';

export interface CodeBlockCommands extends Commands {
  formatCodeBlock?: Command;
}

export interface CodeBlockCommandPlugin extends CommandPlugin {
  commands?: CodeBlockCommands;
}

export const CodeBlockPlugin = (options?: CodeBlockPluginOptions): CodeBlockCommandPlugin => ({
  ...CodeBlockPluginBase(options),
  commands: {
    formatCodeBlock: {
      button: getButtonElement(options?.code_block?.type || ELEMENT_CODE_BLOCK, <Code />),
    },
  },
});
