import { createSelector } from 'reselect';
import { getVoteMatches } from 'state/votematch/selectors';

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

export const getPersons = (state) =>
  state.getIn(['persons', 'items']);

export const getPersonName = (state, props) =>
  state.getIn(['persons', 'items', getPersonId(state, props), 'name']);

export const getPersonVoteMatch = createSelector(
  [getPerson, getVoteMatches],
  (person, votematches) => {
    if (person === undefined) {
      return false;
    }
    return votematches.getIn([person.get('id'), 'similarity']);
  }
);
