import { createSelector } from 'reselect';

export const getPerson = (state, props) => state.getIn(['persons', 'items', props.user]);

export const getPersonName = createSelector(
  getPerson,
  (person) => person.name
);

export const getPersonUrl = createSelector(
  getPerson,
  (person) => {
    if (person !== undefined && person.has('id')) {
      return `/profile/${person.id}`;
    }
    return false;
  }
);
