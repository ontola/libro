import { FormatUnderlined } from '@material-ui/icons';
import { MARK_UNDERLINE, UnderlinePlugin as UnderlinePluginBase, UnderlinePluginOptions } from '@udecode/slate-plugins';
import React from 'react';

import { Command, Commands } from '../../commands/types';
import { getButtonMark } from '../../utils/getButtonMark';
import { toggleMark } from '../../utils/toggleMark';
import { CommandPlugin } from '../types';

export interface UnderlineCommands extends Commands {
  formatUnderline?: Command;
}

export interface UnderlineCommandPlugin extends CommandPlugin {
  commands?: UnderlineCommands;
}

export const UnderlinePlugin = (options?: UnderlinePluginOptions): UnderlineCommandPlugin => ({
  ...UnderlinePluginBase(options),
  commands: {
    formatUnderline: {
      apply: toggleMark(MARK_UNDERLINE),
      button: getButtonMark(MARK_UNDERLINE, <FormatUnderlined />),
    },
  },
});
