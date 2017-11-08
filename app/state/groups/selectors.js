import { createSelector } from 'reselect';

import { getCount } from 'state/counts/selectors';

export const getGroupId = (state, props) => {
  if (props.id) {
    return props.id;
  }

  return null;
};

export const getGroups = state => state.getIn(['groups', 'items']);

export const getGroupName = createSelector(
  [getGroupId, getGroups],
  (groupId, groups) => groups.getIn([groupId, 'image'])
);

export const getGroupByCount = createSelector(
  [getCount, getGroups],
  (count, groups) => {
    const group = groups.get(count.group);

    if (group === undefined) {
      return {};
    }

    return group;
  }
);
