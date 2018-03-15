import { createAction } from 'redux-actions';

import * as actions from '../action-types';

export const setOrganization = createAction(actions.SET_ORGANIZATION);

export default setOrganization;
