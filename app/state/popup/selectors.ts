import { Node } from '@ontologies/core';

import { PopupObject } from './reducer';

export const getCurrentPopup = (state: Record<string, PopupObject>): Node | undefined => state.popup.resource;
export const getCurrentLocation = (state: Record<string, PopupObject>): Record<string, unknown> => state.popup.location;
