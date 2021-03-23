import { Action, handleActions } from 'redux-actions';

import { setPlainRecordIfNew } from '../../helpers/reducers';
import {
  CLOSEABLE_ADD,
  CLOSEABLE_CLOSE,
} from '../action-types';

export interface CloseableState {
  [k: string]: CloseableRecord
}

export interface CloseableRecord {
  identifier: string,
  opened?: boolean,
}

const defaultRecordProps = {
  opened: true,
};

const initialState = {};

const recordCloseable = (props: CloseableRecord) => ({
  ...defaultRecordProps,
  ...props,
});

const Closeable = handleActions({
  [CLOSEABLE_ADD]: (state: CloseableState, { payload }: Action<CloseableRecord>) => setPlainRecordIfNew(
    state,
    recordCloseable(payload),
    payload.identifier,
  ),

  [CLOSEABLE_CLOSE]: (state: CloseableState, { payload }: Action<CloseableRecord>) => ({
    ...state,
    [payload.identifier]: {
      ...state[payload.identifier],
      opened: false,
    },
  }),
}, initialState);

export default Closeable;
