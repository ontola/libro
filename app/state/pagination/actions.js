import { createAction } from 'redux-actions';

import * as actions from '../action-types';

export const gotoPage = createAction(
  actions.GOTO_PAGE,
  (collectionIRI, page) => ({ collectionIRI, page })
);
