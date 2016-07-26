import { Map } from 'immutable';
import { GET_MOTION } from '../constants/actionTypes';
import Motion from '../models/Motion';

const initialState = new Map({
  items: new Map(),
});

const newMotionUnlessExists = (state, id) => {
  const record = state.getIn(['items', id]);
  return record !== undefined ? record : new Motion({ id });
};

const setMotion = (state, record) => state.setIn(
  ['items', record.get('id')],
  record
);

const motions = (state = initialState, action) => {
  let record;
  switch (action.type) {
    case GET_MOTION:
      record = action.payload.record || newMotionUnlessExists(state, action.payload.id);
      return setMotion(state, record);
    default:
      return state;
  }
};

export default motions;
