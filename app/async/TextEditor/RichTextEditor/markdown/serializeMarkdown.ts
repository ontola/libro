import { Node } from 'slate';
import TurndownService from 'turndown';
import { CommandPlugin } from '../plugins';
import { serializeHTMLFromNodes } from './serializeHTMLFromNodes';

export const turndownService = new TurndownService({
  codeBlockStyle: 'fenced',
  headingStyle: 'atx',
});
turndownService.addRule('li-p', {
  filter: (node) => (
    node.parentNode?.nodeName === 'LI' && node.nodeName === 'P'
  ),
  replacement: (content) => content,
});

export const serializeMarkdown = (plugins: CommandPlugin[]) => (nodes: Node[]): string => {
  // 1. Using remark-slate:
  //    - no images
  // return nodes.map((v) => serialize(v as BlockType | LeafType, { nodeTypes: serializeMarkdownNodeTypes })).join('');

  // 2. Through HTML:
  const html = serializeHTMLFromNodes(plugins)(nodes);
  return turndownService.turndown(html);

  // 3. Serialization to Markdown is also on the roadmap of @udecode/slate-plugins
};
