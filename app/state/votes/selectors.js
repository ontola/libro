import { getMotionId } from 'state/motions/selectors';

export const getVotes = (state) =>
  state.getIn(['votes', 'items']);

export const getVoteByMotionId = (state, props) =>
  state.getIn(['votes', 'userVotes', getMotionId(state, props), 'option']);
