import { createReducer } from '../utils/createReducer';

const initialState = {
  activeMotion: 0,
};

export default createReducer({
  ['SET_MOTION_ID']: (state, { data }) => ({
    ...state,
    activeMotion: data,
  }),
}, initialState);

export const setActiveMotion = (id) => ({
  type: 'SET_MOTION_ID',
  data: id
});
