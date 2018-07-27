import { HIGHLIGHT_RESOURCE, SET_CURRENT_USER, SET_ORGANIZATION } from '../action-types';

export const getOrganization = state => state.getIn(['app', SET_ORGANIZATION]);

export const getCurrentUserType = state => state.getIn(['app', SET_CURRENT_USER, 'actorType']);
export const getCurrentUserEmail = state => state.getIn(['app', SET_CURRENT_USER, 'primaryEmail']);

export const isHighlighted = (state, iri) => state.getIn(['app', HIGHLIGHT_RESOURCE]) === iri.value;

export default getOrganization;
