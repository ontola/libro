import { handleActions } from 'redux-actions';

import {
  createDraftFromMarkdown,
  createMarkdownFromDraft,
} from '../../helpers/markdownHelper';
import * as actions from '../action-types';

import {
  getMarkdownTextPlainSlice,
  getSliceDraftContent,
} from './selectors';

const initialState = {
  showPreview: false,
  showRichEditor: true,
};

interface TextEditorState {
  showPreview: boolean;
  showRichEditor: boolean;
  [k: string]: unknown;
}

interface TextEditorPayload {
  id: string;
  editorState: string;
  markdownValue: string;
}

const reducer = handleActions<TextEditorState, TextEditorPayload>({
  [actions.MARKDOWN_EDITOR_HIDE_PREVIEW]: (state) => ({
    ...state,
    showPreview:  false,
  }),
  [actions.MARKDOWN_EDITOR_SHOW_PREVIEW]: (state) => ({
    ...state,
    showPreview:  true,
  }),
  [actions.TEXT_EDITOR_SWITCH_TO_DRAFT]: (state, { payload }) => ({
    ...state,
    showRichEditor: true,
    [payload.id]: createDraftFromMarkdown(getMarkdownTextPlainSlice(state, payload.id)),
  }),
  [actions.TEXT_EDITOR_SWITCH_TO_MARKDOWN]: (state, { payload }) => ({
    ...state,
    showRichEditor: false,
    [`${payload.id}_plain`]: createMarkdownFromDraft(getSliceDraftContent(state, payload.id)),
  }),
  [actions.TEXT_EDITOR_UPDATE_DRAFT]: (state, { payload }) => ({
    ...state,
    [payload.id]: payload.editorState,
  }),
  [actions.TEXT_EDITOR_UPDATE_MARKDOWN]: (state, { payload }) => ({
    ...state,
    [`${payload.id}_plain`]: payload.markdownValue,
  }),
}, initialState);

export default reducer;
