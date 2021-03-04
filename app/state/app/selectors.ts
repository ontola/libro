/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types*/
import { HIGHLIGHT_RESOURCE, SET_CURRENT_USER } from '../action-types';

/**
 * @deprecated
 * Use useCurrentActor instead
 */
export const getCurrentUserType = (state: any) => state.getIn(['app', SET_CURRENT_USER, 'actorType']);

export const isHighlighted = (state: any, iri: any) => state.getIn(['app', HIGHLIGHT_RESOURCE]) === iri.value;
