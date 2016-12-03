export const getSideBar = (state, props) =>
  state.getIn(['sideBars', 'items', props.id]);

export const getSideBarOpened = (state, props) =>
  state.getIn(['sideBars', 'items', props.id, 'opened']);

export const getSideBarDocked = (state, props) =>
  state.getIn(['sideBars', 'items', props.id, 'docked']);
