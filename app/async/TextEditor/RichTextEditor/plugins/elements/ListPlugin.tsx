import { FormatListBulleted, FormatListNumbered } from '@material-ui/icons';
import {
  DEFAULTS_LIST,
  ELEMENT_OL,
  ELEMENT_UL,
  ListOnKeyDownOptions,
  ListPlugin as
  ListPluginBase,
  ListPluginOptions,
} from '@udecode/slate-plugins';
import isHotkey from 'is-hotkey';
import React from 'react';
import { Editor } from 'slate';
import { Command, Commands } from '../../commands/types';
import { withListItems } from '../../transforms/withListItems';
import { getButtonList } from '../../utils/getButtonList';
import { getToggleList } from '../../utils/getToggleList';
import { CommandPlugin } from '../types';

interface ListCommands extends Commands {
  formatListOrdered?: Command;
  formatListUnordered?: Command;
}

export interface ListCommandPlugin extends CommandPlugin {
  commands?: ListCommands;
}

// TODO: custom hotkeys
const onKeyDownList = (options?: ListOnKeyDownOptions) => (e: KeyboardEvent, editor: Editor) => {
  if (isHotkey('mod+1', e)) {
    getToggleList('ol', options)(editor);
  }
  const onKeyDown = ListPluginBase(options).onKeyDown;
  if (onKeyDown) {
    onKeyDown(e, editor);
  }
};

export const ListPlugin = (options?: ListPluginOptions): ListCommandPlugin => {
  return {
    ...ListPluginBase(DEFAULTS_LIST),
    commands: {
      formatListOrdered: {
        apply: getToggleList(ELEMENT_OL, DEFAULTS_LIST),
        button: getButtonList(DEFAULTS_LIST.ol.type, DEFAULTS_LIST, <FormatListNumbered />),
      },
      formatListUnordered: {
        apply: getToggleList(ELEMENT_UL, DEFAULTS_LIST),
        button: getButtonList(DEFAULTS_LIST.ul.type, DEFAULTS_LIST, <FormatListBulleted />),
      },
    },
    extendEditor: withListItems as <T extends Editor>(editor: T) => T,
    onKeyDown: onKeyDownList(options),
  };
};
