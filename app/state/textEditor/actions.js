import { createAction } from 'redux-actions';

import * as actions from '../action-types';

export const showMarkdownEditor = id =>
  createAction(actions.TEXT_EDITOR_SWITCH_TO_MARKDOWN)({ id });
export const showDraftEditor = id =>
  createAction(actions.TEXT_EDITOR_SWITCH_TO_DRAFT)({ id });
export const hidePreview = createAction(actions.MARKDOWN_EDITOR_HIDE_PREVIEW);
export const doShowPreview = createAction(actions.MARKDOWN_EDITOR_SHOW_PREVIEW);
export const updateMarkdown = (id, markdownValue) =>
  createAction(actions.TEXT_EDITOR_UPDATE_MARKDOWN)({ id, markdownValue });
export const updateDraft = (id, editorState) =>
  createAction(actions.TEXT_EDITOR_UPDATE_DRAFT)({ editorState, id });
