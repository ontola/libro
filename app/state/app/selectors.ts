import { Node } from '@ontologies/core';

import { HIGHLIGHT_RESOURCE } from '../action-types';

import { AppState } from './reducer';

export const isHighlighted = (state: Record<string, AppState>, iri: Node): boolean =>
  state.app[HIGHLIGHT_RESOURCE] === iri.value;
