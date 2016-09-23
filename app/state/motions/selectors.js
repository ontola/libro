export const getMotionId = (state, props) => {
  if (props.params) {
    return props.params.motionId;
  }

  if (props.motionId) {
    return props.motionId;
  }

  return null;
};

export const getMotions = (state) =>
  state.getIn(['motions', 'items']);

export const getMotion = (state, props) =>
  state.getIn(['motions', 'items', getMotionId(state, props)]);

export const getMotionVoteEvents = (state, props) =>
  state.getIn(['motions', 'items', getMotionId(state, props), 'voteEvents']);

export const getMotionTitle = (state, props) =>
  state.getIn(['motions', 'items', getMotionId(state, props), 'title']);

export const getMotionArgIds = (state, props) =>
  state.getIn(['motions', 'items', getMotionId(state, props), 'arguments']);
