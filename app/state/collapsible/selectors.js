export const getCollapsible = (state, id) =>
  state.getIn(['collapsible', 'items', id]);

export const getCollapsibleGroup = (state, group) =>
  state.getIn(['collapsible', 'items', group]);

export const getCollapsibleOpened = (state, id) =>
  !!state.getIn(['collapsible', 'items', id, 'opened']);
