const initialState = {
  motions: {}
}

const motions = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_MOTIONS_SUCCESS':
      return Object.assign({}, state, {
        items: action.payload
      });
    break;

    default:
      return state;
  }
}

export default motions;
