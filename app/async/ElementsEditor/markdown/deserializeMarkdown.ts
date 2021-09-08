import { deserializeHTMLToDocument } from '@udecode/slate-plugins';
import marked, { Renderer } from 'marked';
import { Node } from 'slate';

import { CommandPlugins } from '../plugins';
import { toPluginsArray } from '../plugins/toPluginsArray';

const renderer = new Renderer();
renderer.paragraph = (text: string) => `<p>${text.replace(/(\n|\s)+/g, ' ')}</p>\n`;
marked.use({ renderer });

// Taken from marked/helpers.js
const caret = /(^|[^[])\^/g;

const edit = (regex: RegExp, opt?: string) => {
  let regex1: string = regex.source || regex.toString();
  opt = opt || '';
  const obj = {
    getRegex: () => new RegExp(regex1, opt),
    replace: (name: string, val: RegExp) => {
      let val1: string = val.source || val.toString();
      val1 = val1.replace(caret, '$1');
      regex1 = regex1.replace(name, val1);

      return obj;
    },
  };

  return obj;
};

export const deserializeMarkdown = (plugins: CommandPlugins) => (markdown: string): Node[] => {
  if (!markdown || !markdown.trim()) {
    return [{
      children: [{ text: '' }],
      type: 'p',
    }];
  }

  /*
   * Instead of using:
   *   const html = marked(markdown);
   * adapt some rules:
   */
  const lexer: any = new marked.Lexer();

  /*
   * Allow headings without space after hashtags
   * Original regex:                    /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/);
   */
  lexer.tokenizer.rules.block.heading = /^ {0,3}(#{1,6}) *([^\n]*?)(?: +#+)? *(?:\n+|$)/;

  /*
   * Allow one space character after closing square bracket: [] ()
   * Original regex:                    /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/
   */
  lexer.tokenizer.rules.inline.link = /^!?\[(label)\] ?\(\s*(href)(?:\s+(title))?\s*\)/;
  lexer.tokenizer.rules.inline.link = edit(lexer.tokenizer.rules.inline.link)
    .replace('label', lexer.tokenizer.rules.inline._label)
    .replace('href', lexer.tokenizer.rules.inline._href)
    .replace('title', lexer.tokenizer.rules.inline._title)
    .getRegex();

  const tokens = lexer.lex(markdown);
  const html = marked.parser(tokens);
  // Note: <li> is normalized to <li><p> in withListItems
  const parsed = new DOMParser().parseFromString(html, 'text/html');

  return deserializeHTMLToDocument(toPluginsArray(plugins))(parsed.body)[0].children;
};
