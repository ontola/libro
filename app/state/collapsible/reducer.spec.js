import chai, { assert } from 'chai';
import chaiImmutable from 'chai-immutable';
import { Map } from 'immutable';

import * as actions from '../action-types';

import collapsible, { Collapsible } from './reducer';

chai.use(chaiImmutable);

describe('Collapsible reducer', () => {
  it('should return the initial state', () => {
    const expectedState = new Map({
      items: new Map(),
    });

    assert.deepEqual(
      collapsible(undefined, {}),
      expectedState,
      'Initial state is not correct'
    );
  });

  it('should handle COLL_ADD', () => {
    const expectedResponse = new Map({
      items: new Map({
        CDA: new Collapsible({
          opened: false,
        }),
      }),
    });

    assert.deepEqual(
      collapsible(undefined, {
        payload: {
          identifier: 'CDA',
          startOpened: false,
        },
        type: actions.COLL_ADD,
      }),
      expectedResponse,
      'does not handle COLL_ADD very well'
    );
  });

  it('should handle COLL_TOGGLE_ONE', () => {
    const initialState = new Map({
      items: new Map({
        CDA: new Collapsible({
          opened: false,
        }),
      }),
    });

    const expectedState = new Map({
      items: new Map({
        CDA: new Collapsible({
          opened: true,
        }),
      }),
    });

    assert.deepEqual(
      collapsible(initialState, {
        payload: 'CDA',
        type: actions.COLL_TOGGLE_ONE,
      }),
      expectedState,
      'does not handle COLL_TOGGLE_ONE very well'
    );
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

    const expectedState = new Map({
      items: new Map({
        CDA: new Collapsible({
          group: 'politiek',
          opened: false,
        }),
        VVD: new Collapsible({
          group: 'politiek',
          opened: false,
        }),
      }),
    });

    assert.deepEqual(
      collapsible(initialState, {
        payload: {
          id: 'politiek',
        },
        type: actions.COLL_TOGGLE_GROUP,
      }),
      expectedState,
      'does not handle COLL_TOGGLE_GROUP very well'
    );
  });
});
