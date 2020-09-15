import FormatBold from '@material-ui/icons/FormatBold';
import {
  BoldPlugin as BoldPluginBase,
  BoldPluginOptions,
  MARK_BOLD,
} from '@udecode/slate-plugins';
import React from 'react';

import { Command, Commands } from '../../commands';
import { MarkButton } from '../../components/MarkButton';
import { ButtonOptions, CommandPlugin } from '../types';

export const BOLD_COMMAND_KEY = 'formatBold';

export interface BoldCommands extends Commands {
  [BOLD_COMMAND_KEY]: Command;
}

export type BoldCommandPlugin = CommandPlugin<BoldCommands>;

export type BoldCommandPluginOptions = BoldPluginOptions  & {
  bold: ButtonOptions;
};

export const BoldPlugin = (options?: BoldCommandPluginOptions): BoldCommandPlugin => ({
  ...BoldPluginBase(options),
  commands: {
    [BOLD_COMMAND_KEY]: {
      button:
        <MarkButton
          id={BOLD_COMMAND_KEY}
          key={BOLD_COMMAND_KEY}
          title={options?.bold.buttonTitle || 'Bold'}
          type={MARK_BOLD}
        >
          <FormatBold/>
        </MarkButton>,
    },
  },
});
