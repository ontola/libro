import { Action, handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';

import { HIGHLIGHT_RESOURCE } from '../action-types';

export type HighlightResource = string | undefined;

export interface AppState {
  [HIGHLIGHT_RESOURCE]: HighlightResource;
}

const initialState: AppState = {
  [HIGHLIGHT_RESOURCE]: undefined,
};

const collapsible = handleActions({
  [HIGHLIGHT_RESOURCE]: (state: AppState, { payload }: Action<HighlightResource>) => ({
    ...state,
    [HIGHLIGHT_RESOURCE]: payload,
  }),
  [LOCATION_CHANGE]: (state: AppState) => state[HIGHLIGHT_RESOURCE]
    ? {
      ...state,
      [HIGHLIGHT_RESOURCE]: undefined,
    }
    : state,
}, initialState);

export default collapsible;
