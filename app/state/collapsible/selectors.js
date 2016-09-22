export const getCollapsible = (state, props) =>
  state.getIn(['collapsible', 'items', props.id]);

export const getCollapsibleOpened = (state, props) =>
  state.getIn(['collapsible', 'items', props.id, 'opened']);
