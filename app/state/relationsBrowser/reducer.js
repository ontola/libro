import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import { GET_RELATION } from '../action-types';

const initialState = new Map({
  items: new Map(),
});

const buildRelation = relation => new Map({
  current: relation['@id'],
  items: new Map({
    [relation['@id']]: new Map({
      '@type': relation['@type'],
    }),
  }),
});

const relationsBrowser = handleActions({
  [GET_RELATION]: (state, action) => {
    const { error, payload } = action;
    if (error !== true) {
      const { owner, relation } = payload;
      if (typeof state.getIn(['items', owner]) === 'undefined') {
        return state.setIn(['items', owner], buildRelation(relation));
      }

      return state.setIn(
        ['items', owner, relation['@id']],
        new Map({
          '@type': relation['@type'],
        })
      );
    }
    return state;
  },
}, initialState);

export default relationsBrowser;
