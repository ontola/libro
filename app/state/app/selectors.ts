import { Node } from '@ontologies/core';

import { HIGHLIGHT_RESOURCE, SET_CURRENT_USER } from '../action-types';

import { ActorType, AppState } from './reducer';

/**
 * @deprecated
 * Use useCurrentActor instead
 */
export const getCurrentUserType = (state: Record<string, AppState>): ActorType =>
  state.app[SET_CURRENT_USER].actorType;

export const isHighlighted = (state: Record<string, AppState>, iri: Node): boolean =>
  state.app[HIGHLIGHT_RESOURCE] === iri.value;
