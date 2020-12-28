import Immutable from 'immutable';
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

const initialState = new (Immutable as any).Map({
  showPreview: false,
  showRichEditor: true,
});

const reducer = handleActions({
  [actions.MARKDOWN_EDITOR_HIDE_PREVIEW]: (state) => state.set('showPreview', false),
  [actions.MARKDOWN_EDITOR_SHOW_PREVIEW]: (state) => state.set('showPreview', true),
  [actions.TEXT_EDITOR_SWITCH_TO_DRAFT]: (state, { payload }) => state
    .set('showRichEditor', true)
    .set(payload.id, createDraftFromMarkdown(getMarkdownTextPlainSlice(state, payload.id))),
  [actions.TEXT_EDITOR_SWITCH_TO_MARKDOWN]: (state, { payload }) => state
    .set('showRichEditor', false)
    .set(`${payload.id}_plain`, createMarkdownFromDraft(getSliceDraftContent(state, payload.id))),
  [actions.TEXT_EDITOR_UPDATE_DRAFT]: (state, { payload }) => state
    .set(payload.id, payload.editorState),
  [actions.TEXT_EDITOR_UPDATE_MARKDOWN]: (state, { payload }) => state
    .set(`${payload.id}_plain`, payload.markdownValue),
}, initialState);

export default reducer;
