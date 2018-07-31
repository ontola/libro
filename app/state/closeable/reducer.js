import { Map, Record } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  setRecordIfNew,
} from '../../helpers/reducers';
import {
  CLOSEABLE_ADD,
  CLOSEABLE_CLOSE,
} from '../action-types';

export const CloseableRecord = Record({
  id: undefined,
  opened: true,
});

const initialState = new Map();

const recordCloseable = () => new CloseableRecord({
  opened: true,
});

const Closeable = handleActions({
  [CLOSEABLE_ADD]: (state, { payload }) => setRecordIfNew(
    state,
    recordCloseable(payload),
    payload.identifier
  ),

  [CLOSEABLE_CLOSE]: (state, { payload }) => state.setIn([payload, 'opened'], false),
}, initialState);

export default Closeable;
