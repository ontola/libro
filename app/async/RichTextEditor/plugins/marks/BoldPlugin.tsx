import { FormatBold } from '@material-ui/icons';
import { BoldPlugin as BoldPluginBase, BoldPluginOptions, MARK_BOLD } from '@udecode/slate-plugins';
import React from 'react';
import { Command, Commands } from '../../commands/types';
import { getButtonMark } from '../../utils/getButtonMark';
import { getToggleMark } from '../../utils/getToggleMark';
import { CommandPlugin } from '../types';

export interface BoldCommands extends Commands {
  formatBold?: Command;
}

export interface BoldCommandPlugin extends CommandPlugin {
  commands?: BoldCommands;
}

export const BoldPlugin = (options?: BoldPluginOptions): BoldCommandPlugin => {
  return {
    ...BoldPluginBase(options),
    commands: {
      formatBold: {
        apply: getToggleMark(MARK_BOLD),
        button: getButtonMark(MARK_BOLD, <FormatBold />),
      },
    },
  };
};
