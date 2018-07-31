export const getCloseable = (state, id) => state.getIn(['closeable', id]);

export const getCloseableOpened = (state, id) => state.getIn(['closeable', id, 'opened']);
