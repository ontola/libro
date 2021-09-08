import { PlatePlugin } from '@udecode/plate-core';
import { Editor } from 'slate';

import { Commands } from '../commands/types';

export interface CommandPlugin<C extends Commands = Commands> extends PlatePlugin {
  commands: C;
  extendEditor?: <T extends Editor>(editor: T) => T;
}

export interface CommandPlugins {
  [name: string]: CommandPlugin;
}
