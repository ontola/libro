import { createAction } from 'redux-actions';

import * as actions from '../action-types';

export const highlightResource = createAction(actions.HIGHLIGHT_RESOURCE);
export const setOrganization = createAction(actions.SET_ORGANIZATION);

export default setOrganization;
