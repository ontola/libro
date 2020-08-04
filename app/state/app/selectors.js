import { HIGHLIGHT_RESOURCE, SET_CURRENT_USER } from '../action-types';

/**
 * @deprecated
 * Use useCurrentActor instead
*/
export const getCurrentUserType = (state) => state.getIn(['app', SET_CURRENT_USER, 'actorType']);

export const isHighlighted = (state, iri) => state.getIn(['app', HIGHLIGHT_RESOURCE]) === iri.value;
