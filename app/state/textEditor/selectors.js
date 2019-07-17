import { editorStateFromRaw } from 'megadraft';

import { createMarkdownFromDraft } from '../../helpers/markdownHelper';

const makeSlice = state => state.get('textEditor');

const getDraftSlice = (stateSlice, id) => {
  const instance = stateSlice.get(id);

  if (instance === undefined) {
    return editorStateFromRaw();
  }

  return instance;
};

export const getDraftState = (state, id) => getDraftSlice(makeSlice(state), id);

export const getEditorShowRich = state => state.getIn(['textEditor', 'showRichEditor']);
export const getEditorShowPreview = state => state.getIn(['textEditor', 'showPreview']);

export const getMarkdownTextFromDraft = (state, id) => {
  const content = getDraftState(state, id);

  if (content !== undefined) {
    return createMarkdownFromDraft(content);
  }

  return '';
};

export const getMarkdownTextPlainSlice = (stateSlice, id) => {
  const content = stateSlice.getIn([`${id}_plain`]);
  if (content === undefined) {
    return getMarkdownTextFromDraft(stateSlice, id);
  }

  return content;
};

export const getSliceDraftContent = (stateSlice, id) => stateSlice.get(id);

export const getMarkdownTextPlain = (state, id) => {
  let content = state.getIn(['textEditor', `${id}_plain`]);
  if (content === undefined) {
    content = getMarkdownTextFromDraft(state, id);
  }

  return content;
};

// The Markdown value is used as the 'source of truth', since it is what the server accepts.
export const getLatestMarkdown = (state, id) => {
  if (getEditorShowRich(state) === true) {
    return getMarkdownTextFromDraft(state, id);
  }

  return getMarkdownTextPlain(state, id);
};
