import { CloseableRecord, CloseableState } from './reducer';

export const getCloseable = (state: { closeable: CloseableState }, id: string): CloseableRecord =>
  state.closeable[id];

export const getCloseableOpened = (state: { closeable: CloseableState }, id: string): boolean =>
  state.closeable[id]?.opened ?? false;
