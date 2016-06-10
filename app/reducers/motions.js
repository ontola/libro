import { createReducer } from '../utils/createReducer';

const initialState = {
  motions: [],
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
  })
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
