import { createSelector } from 'reselect';

export const getPerson = (state, props) => {
  const userId = props.params !== undefined ? props.params.userId : props.user;
  return state.getIn(['persons', 'items', userId]);
};

export const getPersonName = createSelector([getPerson], (person) => {
  if (person === undefined) {
    return '';
  }
  return person.name;
});

export const getPersonUrl = createSelector([getPerson], (person) => {
  if (person === undefined) {
    return '';
  }
  return `/profile/${person.id}`;
});
