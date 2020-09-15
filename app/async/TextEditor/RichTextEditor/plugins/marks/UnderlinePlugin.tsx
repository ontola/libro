import { FormatUnderlined } from '@material-ui/icons';
import { MARK_UNDERLINE, UnderlinePlugin as UnderlinePluginBase, UnderlinePluginOptions } from '@udecode/slate-plugins';
import React from 'react';
import { Command, Commands } from '../../commands/types';
import { getButtonMark } from '../../utils/getButtonMark';
import { getToggleMark } from '../../utils/getToggleMark';
import { CommandPlugin } from '../types';

export interface UnderlineCommands extends Commands {
  formatUnderline?: Command;
}

export interface UnderlineCommandPlugin extends CommandPlugin {
  commands?: UnderlineCommands;
}

export const UnderlinePlugin = (options?: UnderlinePluginOptions): UnderlineCommandPlugin => {
  return {
    ...UnderlinePluginBase(options),
    commands: {
      formatUnderline: {
        apply: getToggleMark(MARK_UNDERLINE),
        button: getButtonMark(MARK_UNDERLINE, <FormatUnderlined />),
      },
    },
  };
};
