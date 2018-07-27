export const getSideBar = (state, props) => state.getIn(['sideBars', 'items', props.id]);

export const getSideBarColor = state => state.getIn(['sideBars', 'baseColor']);

export const getSideBarDocked = (state, props) => state.getIn(['sideBars', 'items', props.id, 'docked']);

export const getSideBarOpened = (state, props) => state.getIn(['sideBars', 'items', props.id, 'opened']);
