/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types*/
import { convertToRaw } from 'draft-js';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import { editorStateFromRaw } from 'megadraft';
import React from 'react';

export const createDraftFromMarkdown = (markdownValue: any) => {
  if (markdownValue === '') {
    return editorStateFromRaw();
  }

  return editorStateFromRaw(markdownToDraft(markdownValue));
};

export const createMarkdownFromDraft = (contentObject: any) => {
  if (contentObject !== undefined) {
    return draftToMarkdown(convertToRaw(contentObject.getCurrentContent()));
  }

  return '';
};

/** Removes markdown related syntax from a text, making it more fitting for preview texts, meta tags and screen reader items*/
export const stripMarkdown = (text: string | undefined): string => {
  if (text == undefined) {
    return '';
  }

  let output = '';

  // Inspired by https://github.com/stiang/remove-markdown/blob/master/index.js
  output = output
    // Header
    .replace(/\n={2,}/g, '\n')
    // Fenced codeblocks
    .replace(/~{3}.*\n/g, '')
    // Strikethrough
    .replace(/~~/g, '')
    // Fenced codeblocks
    .replace(/`{3}.*\n/g, '')
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove setext-style headers
    .replace(/^[=-]{2,}\s*$/g, '')
    // Remove footnotes?
    .replace(/\[\^.+?\](: .*?$)?/g, '')
    .replace(/\s{0,2}\[.*?\]: .*?$/g, '')
    // Remove images
    .replace(/!\[(.*?)\][[(].*?[\])]/g, '$1')
    // Remove inline links
    .replace(/\[(.*?)\][[(].*?[\])]/g, '$1')
    // Remove blockquotes
    .replace(/^\s{0,3}>\s?/g, '')
    // Remove reference-style links?
    .replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, '')
    // Remove atx-style headers
    // This one differs from the original implementation, see https://github.com/stiang/remove-markdown/issues/52
    .replace(/^(#{1,6}) /gm, '')
    // Remove emphasis (repeat the line to remove double emphasis)
    .replace(/([*_]{1,3})(\S.*?\S{0,1})\1/g, '$2')
    .replace(/([*_]{1,3})(\S.*?\S{0,1})\1/g, '$2')
    // Remove code blocks
    .replace(/(`{3,})(.*?)\1/gm, '$2')
    // Remove inline code
    .replace(/`(.+?)`/g, '$1')
    // Replace two or more newlines with exactly two? Not entirely sure this belongs here...
    .replace(/\n{2,}/g, '\n\n');

  return output;
};

/**
 * Removes markdown syntax, replaces newlines with spaces.
 * @param {string} text
 * @returns {string}
 */
export const useStrippedMarkdown = (text: string | undefined) => React.useMemo(() => (
  stripMarkdown(text)
), [text]);
