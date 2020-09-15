import FormatItalic from '@material-ui/icons/FormatItalic';
import {
  ItalicPlugin as ItalicPluginBase,
  ItalicPluginOptions as ItalicPluginOptionsBase,
  MARK_ITALIC,
} from '@udecode/slate-plugins';
import React from 'react';

import { Command, Commands } from '../../commands';
import { MarkButton } from '../../components/MarkButton';
import { ButtonOptions, CommandPlugin } from '../types';

export const ITALIC_COMMAND_KEY = 'formatItalic';

export interface ItalicCommands extends Commands {
  [ITALIC_COMMAND_KEY]: Command;
}

export type ItalicCommandPlugin = CommandPlugin<ItalicCommands>;

export type ItalicCommandPluginOptions = ItalicPluginOptionsBase  & {
  italic: ButtonOptions;
};

export const ItalicPlugin = (options?: ItalicCommandPluginOptions): ItalicCommandPlugin => ({
  ...ItalicPluginBase(options),
  commands: {
    [ITALIC_COMMAND_KEY]: {
      button:
        <MarkButton
          id={ITALIC_COMMAND_KEY}
          key={ITALIC_COMMAND_KEY}
          title={options?.italic.buttonTitle || 'Italic'}
          type={MARK_ITALIC}
        >
          <FormatItalic/>
        </MarkButton>,
    },
  },
});
