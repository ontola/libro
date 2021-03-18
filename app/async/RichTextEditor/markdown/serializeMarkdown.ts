import { Node } from 'slate';
import TurndownService from 'turndown';

import { CommandPlugins } from '../plugins';
import { toPluginsArray } from '../plugins/toPluginsArray';

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

export const serializeMarkdown = (plugins: CommandPlugins) => (nodes: Node[]): string => {
  const html = serializeHTMLFromNodes(toPluginsArray(plugins))(nodes);

  return turndownService.turndown(html);
};
