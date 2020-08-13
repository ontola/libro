import { Editor, Node } from 'slate';
import { ReactEditor } from 'slate-react';

import { CommandPlugin } from '../plugins/types';
import { comparePlugins } from '../plugins/comparePlugins';
import { deserializeMarkdown, serializeMarkdown } from '../markdown';

export interface PluginEditor extends Editor {
  plugins: CommandPlugin[];
  deserializeMarkdown: (markdown: string) => Node[];
  serializeMarkdown: (nodes: Node[]) => string;
}

export const withPlugins = (plugins: CommandPlugin[]) => <T extends ReactEditor>(e: T) => {
  let editor = e as T & PluginEditor;
  editor.plugins = plugins;
  editor.deserializeMarkdown = deserializeMarkdown(plugins);
  editor.serializeMarkdown = serializeMarkdown(plugins);
  
  if (plugins) {
    plugins
      .filter(plugin => !plugin.disabled && plugin.extendEditor)
      .sort(comparePlugins)
      .reduce((editor, plugin) => editor = plugin.extendEditor(editor), editor);
  }

  return editor;
}
