import { createAction } from 'redux-actions';

import * as actions from '../action-types';

export const setMetadata = createAction(actions.IFRAME_METADATA);

export default setMetadata;
