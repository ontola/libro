import { createAction } from 'redux-actions';

import * as actions from '../action-types';

export const showMarkdownEditor = createAction(
  actions.TEXT_EDITOR_SWITCH_TO_MARKDOWN,
  (id: string) => ({ id }),
);
export const showDraftEditor = createAction(
  actions.TEXT_EDITOR_SWITCH_TO_DRAFT,
  (id: string) => ({ id }),
);
export const hidePreview = createAction(actions.MARKDOWN_EDITOR_HIDE_PREVIEW);
export const doShowPreview = createAction(actions.MARKDOWN_EDITOR_SHOW_PREVIEW);
export const updateMarkdown = createAction(
  actions.TEXT_EDITOR_UPDATE_MARKDOWN,
  (id: string, markdownValue: string) => ({
    id,
    markdownValue,
  }),
);
export const updateDraft = createAction(
  actions.TEXT_EDITOR_UPDATE_DRAFT,
  (id: string, editorState: any) => ({
    editorState,
    id,
  }),
);
