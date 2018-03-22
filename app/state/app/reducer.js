import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

import { NS } from '../../helpers/LinkedRenderStore';
import { SET_ORGANIZATION } from '../../state/action-types';

const initialState = new Map({
  [SET_ORGANIZATION]: NS.app('o/argu'),
});

const collapsible = handleActions({
  [SET_ORGANIZATION]: (state, { payload }) => state.set(SET_ORGANIZATION, payload),
}, initialState);

export default collapsible;
