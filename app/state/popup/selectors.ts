import { Node } from '@ontologies/core';
import { Map } from 'immutable';

import { PopupObject } from './reducer';

export const getCurrentPopup = (state: Map<string, PopupObject>): Node | undefined => state.get('popup').resource;
export const getCurrentLocation = (state: Map<string, PopupObject>): Record<string, unknown> => state.get('popup').location;
