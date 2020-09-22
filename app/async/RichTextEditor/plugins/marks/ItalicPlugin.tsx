import { FormatItalic } from '@material-ui/icons';
import { ItalicPlugin as ItalicPluginBase, ItalicPluginOptions, MARK_ITALIC } from '@udecode/slate-plugins';
import React from 'react';

import { Command, Commands } from '../../commands/types';
import { getButtonMark } from '../../utils/getButtonMark';
import { toggleMark } from '../../utils/toggleMark';
import { CommandPlugin } from '../types';

export interface ItalicCommands extends Commands {
  formatItalic?: Command;
}

export interface ItalicCommandPlugin extends CommandPlugin {
  commands?: ItalicCommands;
}

export const ItalicPlugin = (options?: ItalicPluginOptions): ItalicCommandPlugin => ({
  ...ItalicPluginBase(options),
  commands: {
    formatItalic: {
      apply: toggleMark(MARK_ITALIC),
      button: getButtonMark(MARK_ITALIC, <FormatItalic />),
    },
  },
});
