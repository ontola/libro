import { Map } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  GET_MOTION,
} from '../constants/actionTypes';
import Motion from '../models/Motion';

const initialState = new Map({
  items: new Map(),
});
const LAST_RESOURCE_NAME_INX = -2;
const LAST_RESOURCE_ID_INX = -1;

function newMotionUnlessExists(state, id) {
  const record = state.getIn(['items', id]);
  return record !== undefined ? record : new Motion({ id });
}

function setMotion(state, record) {
  return state.setIn(
    ['items', record.get('id')],
    record
  );
}

const motions = (state = initialState, action) => {
  let splitpath;
  switch (action.type) {
    case LOCATION_CHANGE:
      splitpath = action.payload.pathname.split('/');
      if (splitpath[splitpath.length + LAST_RESOURCE_NAME_INX] === 'motion') {
        return setMotion(
          state,
          newMotionUnlessExists(state, splitpath[splitpath.length + LAST_RESOURCE_ID_INX])
        );
      }
      break;
    case GET_MOTION:
      if (action.payload.record) {
        return state.setIn(
          ['items', action.payload.record.get('id')],
          action.payload.record
        );
      }
      break;

    default:
      return state;
  }

  return state;
};

export default motions;
