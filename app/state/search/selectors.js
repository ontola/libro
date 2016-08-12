import { createSelector } from 'reselect';

export const getSearch = state => state.get('search');

export const getDrawerVisible = createSelector([getSearch], search => {
  if (search === undefined) {
    return '';
  }
  return search.get('visible');
});

export const getSearchHits = createSelector([getSearch], search => {
  if (search === undefined) {
    return '';
  }
  return search.get('hits');
});
