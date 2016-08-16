import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import Motion from 'models/Motion';
import { GET_MOTION } from '../action-types';

const initialState = new Map({
  items: new Map(),
});

const newMotionUnlessExists = (state, id) => {
  const record = state.getIn(['items', id]);
  return record !== undefined ? record : new Motion({ id, loading: true });
};

const motions = handleActions({
  [GET_MOTION]: (state, { payload }) => {
    const record = payload.record || newMotionUnlessExists(state, payload.id);
    return state.setIn(['items', record.id], record);
  },
}, initialState);

export default motions;
