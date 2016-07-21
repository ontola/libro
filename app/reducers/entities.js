const initialState = {
  motion: [],
  person: [],
  vote: [],
  vote_event: [],
  argument: [],
};

const entities = (state = initialState, action) => {
  if (action.payload && action.payload.entities) {
    return Object.assign({}, state, action.payload.entities);
  }

  return state;
};

export default entities;
