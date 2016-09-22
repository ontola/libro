export const getEventItem = (state, props) => state.getIn(['evenItems', 'items', props.id]);
