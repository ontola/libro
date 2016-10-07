export const getCollapsible = (state, props) =>
  state.getIn(['collapsible', 'items', props.id]);

export const getCollapsibleGroup = (state, group) =>
  state.getIn(['collapsible', 'items', group]);

export const getCollapsibleOpened = (state, props) =>
  state.getIn(['collapsible', 'items', props.id, 'opened']);
