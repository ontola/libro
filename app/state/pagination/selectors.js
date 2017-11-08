export const getPage = (state, id) =>
  state.getIn(['pagination', 'items', id]);

export default getPage;
