import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import { editorStateFromRaw } from 'megadraft';
import { convertToRaw } from 'draft-js';

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
