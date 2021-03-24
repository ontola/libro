/* eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import { editorStateFromRaw } from 'megadraft';

import { createMarkdownFromDraft } from '../../helpers/markdownHelper';

const makeSlice = (state: any) => state.get('textEditor');

const getDraftSlice = (stateSlice: any, id: any) => {
  const instance = stateSlice[id];

  if (instance === undefined) {
    return editorStateFromRaw();
  }

  return instance;
};

export const getDraftState = (state: any, id: any) => getDraftSlice(makeSlice(state), id);

export const getEditorShowRich = (state: any) => state.textEditor.showRichEditor;
export const getEditorShowPreview = (state: any) => state.textEditor.showPreview;

export const getMarkdownTextFromDraft = (state: any, id: any) => {
  const content = getDraftState(state, id);

  if (content !== undefined) {
    return createMarkdownFromDraft(content);
  }

  return '';
};

export const getMarkdownTextPlainSlice = (stateSlice: any, id: any) => {
  const content = stateSlice[`${id}_plain`];
  if (content === undefined) {
    return getMarkdownTextFromDraft(stateSlice, id);
  }

  return content;
};

export const getSliceDraftContent = (stateSlice: any, id: any) => stateSlice.get(id);

export const getMarkdownTextPlain = (state: any, id: any) => {
  let content = state.textEditor[`${id}_plain`];
  if (content === undefined) {
    content = getMarkdownTextFromDraft(state, id);
  }

  return content;
};

// The Markdown value is used as the 'source of truth', since it is what the server accepts.
export const getLatestMarkdown = (state: any, id: any) => {
  if (getEditorShowRich(state) === true) {
    return getMarkdownTextFromDraft(state, id);
  }

  return getMarkdownTextPlain(state, id);
};
