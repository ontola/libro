import { Map } from 'immutable';

import * as actions from '../action-types';

import collapsible, { Collapsible } from './reducer';

describe('Collapsible reducer', () => {
  it('should return the initial state', () => {
    expect(collapsible(undefined, {}).get('items').size).toEqual(0);
  });

  it('should handle COLL_ADD', () => {
    const reduced = collapsible(undefined, {
      payload: {
        identifier: 'CDA',
        startOpened: false,
      },
      type: actions.COLL_ADD,
    });

    expect(reduced.getIn(['items', 'CDA', 'opened'])).toEqual(false);
  });

  it('should handle COLL_TOGGLE_ONE', () => {
    const initialState = new Map({
      items: new Map({
        CDA: new Collapsible({
          opened: false,
        }),
      }),
    });

    const reduced = collapsible(initialState, {
      payload: 'CDA',
      type: actions.COLL_TOGGLE_ONE,
    });

    expect(reduced.getIn(['items', 'CDA', 'opened'])).toEqual(true);
  });

  it('should handle COLL_TOGGLE_GROUP', () => {
    const initialState = new Map({
      items: new Map({
        CDA: new Collapsible({
          group: 'politiek',
          opened: true,
        }),
        VVD: new Collapsible({
          group: 'politiek',
          opened: true,
        }),
      }),
    });

    const reduced = collapsible(initialState, {
      payload: {
        id: 'politiek',
      },
      type: actions.COLL_TOGGLE_GROUP,
    });

    expect(reduced.getIn(['items', 'CDA', 'group'])).toEqual('politiek');
    expect(reduced.getIn(['items', 'CDA', 'opened'])).toEqual(false);

    expect(reduced.getIn(['items', 'VVD', 'group'])).toEqual('politiek');
    expect(reduced.getIn(['items', 'VVD', 'opened'])).toEqual(false);
  });
});
