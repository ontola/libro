import { createReducer } from '../utils/createReducer';

const initialState = {
  motions: [],
  activeMotion: null,
};

export default createReducer({
  ['GET_MOTIONS_REQUEST']: (state, { payload }) => ({
    ...state,
    motions: [],
  }),

  ['GET_MOTIONS_SUCCESS']: (state, { payload }) => ({
    ...state,
    motions: payload,
  }),

  ['GET_MOTIONS_FAILURE']: (state, { payload }) => ({
    ...state,
    motions: false
  }),

  ['SET_MOTION_ID']: (state, { data }) => ({
    ...state,
    activeMotion: data,
  }),
}, initialState);

export const apiGetMotions = (id) => ({
  mode: 'GET',
  type: 'GET_MOTIONS',
  url: 'motions',
  data: {
    identifier: id,
  },
  onSuccess: (res, dispatch) => {
  //  console.log(res);
  },
  onFailure: (res, dispatch) => {
  //  console.log(res);
  },
  callback: (res, dispatch) => {
  //  console.log('joe', res);
  },
});

export const setActiveMotion = (id) => ({
  type: 'SET_MOTION_ID',
  data: id
});
