import { deserializeHTMLToDocument } from '@udecode/slate-plugins';
import { Node } from 'slate';

import { DefaultPlugins } from '../plugins/DefaultPlugins';

const marked = require('marked');

const renderer = {
  paragraph: (text: string) => (
    '<p>' + text.replace(/(\n|\s)+/g, ' ') + '</p>\n'
  ),
};
marked.use({ renderer });

// Taken from marked/helpers.js
const caret = /(^|[^\[])\^/g;
const edit = (regex: RegExp, opt: string = null) => {
  let _regex: string = regex.source || regex.toString();
  opt = opt || '';
  const obj = {
    getRegex: () => {
      return new RegExp(_regex, opt);
    },
    replace: (name: string, val: RegExp) => {
      let _val: string = val.source || val.toString();
      _val = _val.replace(caret, '$1');
      _regex = _regex.replace(name, _val);
      return obj;
    },
  };
  return obj;
};

export const deserializeMarkdown = (markdown: string): Node[] => {
  // 1. Using remark-slate:
  // return parseMD(deserializeMarkdownOptions)(markdown);

  // 2. By way of HTML:
  //
  // Instead of using:
  //   const html = marked(markdown);
  // adapt some rules:
  var lexer = new marked.Lexer();

  // Allow headings without space after hashtags
  // Original regex:                    /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/);
  lexer.tokenizer.rules.block.heading = /^ {0,3}(#{1,6}) *([^\n]*?)(?: +#+)? *(?:\n+|$)/;

  // Allow one space character after closing square bracket: [] ()
  // Original regex:                    /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/
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

  return deserializeHTMLToDocument(DefaultPlugins)(parsed.body)[0].children;
};
