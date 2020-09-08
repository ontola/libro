import { SlatePlugin } from '@udecode/slate-plugins';
import { Editor } from 'slate';

import { Command } from '../commands/types';

export interface CommandPlugin extends SlatePlugin {
  name: string;
  commands?: Command[];
  extendEditor?: <T extends Editor>(editor: T) => T;
  extendEditorIndex?: number;
  disabled?: boolean;
}
