/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types*/
import { convertToRaw } from 'draft-js';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import { editorStateFromRaw } from 'megadraft';
import React from 'react';
import removeMd from 'remove-markdown';

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

const removeMdOpts = {
  // Allow Github Flavored markdown
  gfm: true,
};

export const stripMarkdown = (text: string | undefined) => (
  text && removeMd(text, removeMdOpts).replace(/[\r\n]/g, ' ')
);

/**
 * Removes markdown syntax, replaces newlines with spaces.
 * @param {string} text
 * @returns {string}
 */
export const useStrippedMarkdown = (text: string | undefined) => React.useMemo(() => (
  stripMarkdown(text)
), [text]);
