import { createSelector } from 'reselect';
import { Map } from 'immutable';

import { GET_MOTION, GET_MOTIONS } from '../constants/actionTypes';
import Motion from '../models/Motion';

const initialState = new Map({
  items: new Map(),
});

const newMotionUnlessExists = (state, id) => {
  const record = state.getIn(['items', id]);
  return record !== undefined ? record : new Motion({ id, loading: true });
};

const motions = (state = initialState, action) => {
  let record;
  switch (action.type) {
    case GET_MOTION:
      record = action.payload.record || newMotionUnlessExists(state, action.payload.id);
      return state.setIn(['items', record.id], record);
    case GET_MOTIONS:
      return state;
    default:
      return state;
  }
};

export default motions;

const getMotion = (state, props) => state.getIn(['motions', 'items', props.params.motionId]);
const getArguments = (state) => state.getIn(['argumentations', 'items']);

export const getArgumentsByMotion = createSelector(
  [getMotion, getArguments],
  (motion, argumentations) => {
    if (motion !== undefined && motion.has('arguments')) {
      return motion.get('arguments').map(a => (
        argumentations.get(a) !== undefined ? argumentations.get(a) : false
      ));
    }
    return [];
  }
);
