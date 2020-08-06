import { Editor } from 'slate';
import { SlatePlugin } from '@udecode/slate-plugins';
import { Node as SlateNode } from 'slate';
import { Command } from '../commands/types';

export interface CommandPlugin extends SlatePlugin {
  name: string;
  commands?: Command[];
  disabled?: boolean;
}

export interface CommandEditor extends Editor {
  commandPlugins: CommandPlugin[];
  // deserializeMarkdown: (value: string) => any;
}

export interface SerializeMarkdownNodesProps {
  nodes: SlateNode[];
  parent?: SlateNode;
  index?: number;
}

export interface SerializeMarkdownProps {
  element: SlateNode;
  parent?: SlateNode;
  index?: number;
  markdownChildren: string;
}
