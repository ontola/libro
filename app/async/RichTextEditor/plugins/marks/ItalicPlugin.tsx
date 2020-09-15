import { FormatItalic } from '@material-ui/icons';
import { ItalicPlugin as ItalicPluginBase, ItalicPluginOptions, MARK_ITALIC } from '@udecode/slate-plugins';
import React from 'react';
import { Command, Commands } from '../../commands/types';
import { getButtonMark } from '../../utils/getButtonMark';
import { getToggleMark } from '../../utils/getToggleMark';
import { CommandPlugin } from '../types';

export interface ItalicCommands extends Commands {
  formatItalic?: Command;
}

export interface ItalicCommandPlugin extends CommandPlugin {
  commands?: ItalicCommands;
}

export const ItalicPlugin = (options?: ItalicPluginOptions): ItalicCommandPlugin => {
  return {
    ...ItalicPluginBase(options),
    commands: {
      formatItalic: {
        apply: getToggleMark(MARK_ITALIC),
        button: getButtonMark(MARK_ITALIC, <FormatItalic />),
      },
    },
  };
};
