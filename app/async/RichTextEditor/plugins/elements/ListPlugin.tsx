import { FormatListBulleted, FormatListNumbered } from '@material-ui/icons';
import {
  DEFAULTS_LIST,
  ELEMENT_OL,
  ELEMENT_UL,
  ListPlugin as ListPluginBase,
  ListPluginOptions,
} from '@udecode/slate-plugins';
import React from 'react';
import { Editor } from 'slate';

import { Command, Commands } from '../../commands/types';
import { withListItems } from '../../transforms/withListItems';
import { getButtonList } from '../../utils/getButtonList';
import { toggleList } from '../../utils/toggleList';
import { CommandPlugin } from '../types';

export interface ListCommands extends Commands {
  formatListOrdered?: Command;
  formatListUnordered?: Command;
}

export interface ListCommandPlugin extends CommandPlugin {
  commands?: ListCommands;
}

export const ListPlugin = (options: ListPluginOptions = DEFAULTS_LIST): ListCommandPlugin => {
  const typeOL = options.ol?.type || ELEMENT_OL;
  const typeUL = options.ul?.type || ELEMENT_UL;

  return {
    ...ListPluginBase(options),
    commands: {
      formatListOrdered: {
        apply: toggleList(typeOL, options),
        button: getButtonList(typeOL, options, <FormatListNumbered />),
      },
      formatListUnordered: {
        apply: toggleList(typeUL, options),
        button: getButtonList(typeUL, options, <FormatListBulleted />),
      },
    },
    extendEditor: withListItems as <T extends Editor>(editor: T) => T,
  };
};
