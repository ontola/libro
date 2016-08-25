import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import Motion from 'models/Motion';
import Vote from 'models/Vote';

import {
  GET_MOTION,
  SET_VOTE,
} from '../action-types';

const initialState = new Map({
  items: new Map(),
  votes: new Map(),
});

const newMotionUnlessExists = (state, id) => {
  const record = state.getIn(['items', id]);
  return record !== undefined ? record : new Motion({ id, loading: true });
};

const motions = handleActions({
  [GET_MOTION]: (state, { error, payload }) => {
    const record = payload.record || newMotionUnlessExists(state, payload.id);

    if (error) {
      return state.deleteIn(['items', payload.id]);
    }

    return state.setIn(['items', record.id], record);
  },
  [SET_VOTE]: (state, { payload }) => {
    const record = new Vote({
      id: payload.motionId,
      individual: true,
      value: payload.side,
    });
    return state.setIn(['votes', payload.motionId], record);
  },
}, initialState);

export default motions;
