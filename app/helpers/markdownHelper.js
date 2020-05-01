import { convertToRaw } from 'draft-js';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import { editorStateFromRaw } from 'megadraft';
import React from 'react';
import removeMd from 'remove-markdown';

export const createDraftFromMarkdown = (markdownValue) => {
  if (markdownValue === '') {
    return editorStateFromRaw();
  }

  return editorStateFromRaw(markdownToDraft(markdownValue));
};

export const createMarkdownFromDraft = (contentObject) => {
  if (contentObject !== undefined) {
    return draftToMarkdown(convertToRaw(contentObject.getCurrentContent()));
  }

  return '';
};

const removeMdOpts = {
  // Allow Github Flavored markdown
  gfm: true,
};

/**
 * Removes markdown syntax, replaces newlines with spaces.
 * @param {string} text
 * @returns {string}
 */
export const stripMarkdown = (text) => React.useMemo(() => {
  const strippedText = removeMd(text, removeMdOpts);

  return strippedText.replace(/[\r\n]/g, ' ');
}, [text]);
