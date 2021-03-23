import { Node } from '@ontologies/core';
import { Map } from 'immutable';

import { HIGHLIGHT_RESOURCE, SET_CURRENT_USER } from '../action-types';

import { ActorType, AppState } from './reducer';

/**
 * @deprecated
 * Use useCurrentActor instead
 */
export const getCurrentUserType = (state: Map<string, AppState>): ActorType =>
  state.get('app')[SET_CURRENT_USER].actorType;

export const isHighlighted = (state: Map<string, AppState>, iri: Node): boolean =>
  state.get('app')[HIGHLIGHT_RESOURCE] === iri.value;
