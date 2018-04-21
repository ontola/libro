import { HIGHLIGHT_RESOURCE, SET_ORGANIZATION } from '../action-types';

export const getOrganization = state =>
  state.getIn(['app', SET_ORGANIZATION]);

export const isHighlighted = (state, iri) => state.getIn(['app', HIGHLIGHT_RESOURCE]) === iri.value;

export default getOrganization;
