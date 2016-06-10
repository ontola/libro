import { createReducer } from '../utils/createReducer';

const initialState = {
  items: [],
};

export default createReducer({
  ['GET_MOTIONS_REQUEST']: (state, { payload }) => ({
    ...state,
    items: [],
  }),

  ['GET_MOTIONS_SUCCESS']: (state, { payload }) => ({
    ...state,
    items: payload.motions,
  }),

  ['GET_MOTIONS_FAILURE']: (state, { payload }) => ({
    ...state,
    items: false
  })
}, initialState);

export const apiGetMotions = (id) => ({
  mode: 'GET',
  type: 'GET_MOTIONS',
  data: {
    identifier: id,
  },
  url: 'motions',
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
