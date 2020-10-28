import { withInlineVoid } from '@udecode/slate-plugins';
import { Editor } from 'slate';

import { PluginEditor } from '../../transforms/withPlugins';
import { toPluginsArray } from '../toPluginsArray';
import { CommandPlugin } from '../types';

export const InlineVoidPlugin: CommandPlugin = {
  commands: {},
  extendEditor: <T extends Editor>(editor: T) => {
    const e = editor as T & PluginEditor;
    return withInlineVoid({ plugins: toPluginsArray(e.plugins) })(e);
  },
};
