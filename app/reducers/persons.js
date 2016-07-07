import {
  FETCH_PERSONS_REQUEST,
  FETCH_PERSONS_SUCCESS,
  FETCH_PERSONS_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  items: [],
  loading: false,
};

const persons = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PERSONS_REQUEST:
      return Object.assign({}, state, {
        items: [],
        loading: true,
      });

    case FETCH_PERSONS_SUCCESS:
      return Object.assign({}, state, {
        items: action.payload,
        loading: false,
      });

    case FETCH_PERSONS_FAILURE:
      return Object.assign({}, state, {
        items: [],
        loading: false,
      });

    default:
      return state;
  }
};

export default persons;
