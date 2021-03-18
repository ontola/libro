import FormatUnderlined from '@material-ui/icons/FormatUnderlined';
import {
  MARK_UNDERLINE,
  UnderlinePluginOptions as UnderlinePluginOptionsBase,
  UnderlinePlugin as underlinePluginBase,
} from '@udecode/slate-plugins';
import React from 'react';

import { Command, Commands } from '../../commands';
import { MarkButton } from '../../components/MarkButton';
import { ButtonOptions, CommandPlugin } from '../types';

export const UNDERLINE_COMMAND_KEY = 'formatUnderline';

export interface UnderlineCommands extends Commands {
  [UNDERLINE_COMMAND_KEY]: Command;
}

export type UnderlineCommandPlugin = CommandPlugin<UnderlineCommands>;

export type UnderlineCommandPluginOptions = UnderlinePluginOptionsBase & {
  underline: ButtonOptions;
};

export const underlinePlugin = (options?: UnderlineCommandPluginOptions): UnderlineCommandPlugin => ({
  ...underlinePluginBase(options),
  commands: {
    [UNDERLINE_COMMAND_KEY]: {
      button:
  <MarkButton
    id={UNDERLINE_COMMAND_KEY}
    key={UNDERLINE_COMMAND_KEY}
    title={options?.underline.buttonTitle || 'Underline'}
    type={MARK_UNDERLINE}
  >
    <FormatUnderlined />
  </MarkButton>,
    },
  },
});
