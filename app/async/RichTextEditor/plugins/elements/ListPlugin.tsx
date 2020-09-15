import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import {
  DEFAULTS_LIST,
  ELEMENT_OL,
  ELEMENT_UL,
  ListPlugin as ListPluginBase,
  ListPluginOptions as ListPluginOptions,
} from '@udecode/slate-plugins';
import React from 'react';
import { Editor } from 'slate';

import { Command, Commands } from '../../commands';
import { ListButton } from '../../components';
import { withListItems } from '../../transforms';

import { ButtonOptions, CommandPlugin } from '../types';

export const ORDERED_LIST_COMMAND_KEY = 'formatListOrdered';
export const UNORDERED_LIST_COMMAND_KEY = 'formatListUnordered';

export interface ListCommands extends Commands {
  [ORDERED_LIST_COMMAND_KEY]: Command;
  [UNORDERED_LIST_COMMAND_KEY]: Command;
}

export type ListCommandPlugin = CommandPlugin<ListCommands>;

export type ListCommandPluginOptions = ListPluginOptions & {
  ol: ButtonOptions;
  ul: ButtonOptions;
};

export const ListPlugin = (options: ListCommandPluginOptions = DEFAULTS_LIST): ListCommandPlugin => ({
  ...ListPluginBase(options),
  commands: {
    [ORDERED_LIST_COMMAND_KEY]: {
      button:
        <ListButton
          id={ORDERED_LIST_COMMAND_KEY}
          key={ORDERED_LIST_COMMAND_KEY}
          options={options}
          title={options.ol.buttonTitle || 'Numbered list'}
          type={options.ol?.type || ELEMENT_OL}
        >
          <FormatListNumbered/>
        </ListButton>,
    },
    [UNORDERED_LIST_COMMAND_KEY]: {
      button:
        <ListButton
          id={UNORDERED_LIST_COMMAND_KEY}
          key={UNORDERED_LIST_COMMAND_KEY}
          options={options}
          title={options.ul.buttonTitle || 'Bulleted list'}
          type={options.ul?.type || ELEMENT_UL}
        >
          <FormatListBulleted/>
        </ListButton>,
    },
  },
  extendEditor: withListItems as <T extends Editor>(editor: T) => T,
});
