import { Node as SlateNode } from 'slate';
// import { serialize } from 'remark-slate';
// import { BlockType, LeafType } from "remark-slate/dist/serialize";
import { DefaultPlugins } from '../plugins/DefaultPlugins';
import TurndownService from 'turndown';
// import { serializeHTMLFromNodes } from '@udecode/slate-plugins';
import { serializeHTMLFromNodes } from './serializeHTMLFromNodes';

export const turndownService = new TurndownService({ 
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});
turndownService.addRule('li-p', {
  filter: (node, options) => {
    return (
      node.parentNode.nodeName === 'LI' &&
      node.nodeName === 'P'
    )
  },
  replacement: (content) => content
});

export const serializeMarkdown = (nodes: SlateNode[]): string => {
  // 1. Using remark-slate:
  //    - no images
  // return nodes.map((v) => serialize(v as BlockType | LeafType, { nodeTypes: serializeMarkdownNodeTypes })).join('');

  // 2. Through HTML: 
  const html = serializeHTMLFromNodes(DefaultPlugins)(nodes);
  return turndownService.turndown(html);

  // 3. Serialization to Markdown is also on the roadmap of @udecode/slate-plugins
};
