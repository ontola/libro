import { createAction } from 'redux-actions';

import * as actions from '../action-types';

const resetErrorMessage = createAction(actions.RESET_ERROR_MESSAGE);

export { resetErrorMessage as default };
