import { linkedObjectVersionByIRI } from 'link-redux';

export const getCurrentRelationId = (state, id) =>
  state.getIn(['relationsBrowser', 'items', id, 'current']);

export const getCurrentRelation = (state, id) => {
  const selectedRelation = getCurrentRelationId(state, id);
  return linkedObjectVersionByIRI(state, selectedRelation);
};

export default getCurrentRelation;
