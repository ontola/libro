export const getPersonId = (state, props) => {
  if (props.params) {
    return props.params.userId;
  }

  if (props.user) {
    return props.user;
  }

  return null;
};

export const getPerson = (state, props) =>
  state.getIn(['persons', 'items', getPersonId(state, props)]);

export const getPersonName = (state, props) =>
  state.getIn(['persons', 'items', getPersonId(state, props), 'name']);
