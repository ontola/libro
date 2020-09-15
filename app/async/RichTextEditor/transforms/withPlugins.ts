import { Editor, Node } from 'slate';
import { ReactEditor } from 'slate-react';

import { deserializeMarkdown, serializeMarkdown } from '../markdown';
import { comparePlugins } from '../plugins/comparePlugins';
import { toPluginsArray } from '../plugins/toPluginsArray';
import { CommandPlugins } from '../plugins/types';

export interface PluginEditor extends Editor {
  plugins: CommandPlugins;
  deserializeMarkdown: (markdown: string) => Node[];
  serializeMarkdown: (nodes: Node[]) => string;
}

export const withPlugins = (plugins: CommandPlugins) => <T extends ReactEditor>(e: T) => {
  const editor = e as T & PluginEditor;
  editor.plugins = plugins;
  editor.deserializeMarkdown = deserializeMarkdown(plugins);
  editor.serializeMarkdown = serializeMarkdown(plugins);

  toPluginsArray(plugins)
    .filter((plugin) => plugin.extendEditor)
    .sort(comparePlugins)
    .forEach((plugin) => plugin.extendEditor!(editor));

  return editor;
};
