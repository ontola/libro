import { Editor, Node } from 'slate';
import { ReactEditor } from 'slate-react';

import { toPluginsArray } from '../plugins/toPluginsArray';
import { CommandPlugins } from '../plugins/types';

export interface PluginEditor extends Editor {
  plugins: CommandPlugins;
  deserializeMarkdown: (markdown: string) => Node[];
  serializeMarkdown: (nodes: Node[]) => string;
}

export const withPlugins = (plugins: CommandPlugins) => <T extends ReactEditor>(e: T): T & PluginEditor => {
  const editor = e as T & PluginEditor;
  editor.plugins = plugins;
  // editor.deserializeMarkdown = deserializeMarkdown(plugins);
  // editor.serializeMarkdown = serializeMarkdown(plugins);

  toPluginsArray(plugins)
    .filter((plugin) => plugin.extendEditor)
    .forEach((plugin) => plugin.extendEditor!(editor));

  return editor;
};
