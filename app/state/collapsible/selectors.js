import { createSelector } from 'reselect';

export const getCollapsibles = (state) => state.getIn(['collapsible', 'items']);

export const getCollapsibleId = (state, props) => props.id;

export const getCollapsible = createSelector(
  getCollapsibles,
  getCollapsibleId,
  (collapsibles, id) => {
    if (collapsibles.get(id) === undefined) {
      return '';
    }
    return collapsibles.get(id);
  }
);
