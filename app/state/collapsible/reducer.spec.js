import chai, { assert } from 'chai';
import { Map } from 'immutable';
import chaiImmutable from 'chai-immutable';

import collapsible, { Collapsible } from './reducer';
import * as actions from '../action-types';

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
        type: actions.COLL_ADD,
        payload: {
          startOpened: false,
          identifier: 'CDA',
        },
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
        type: actions.COLL_TOGGLE_ONE,
        payload: {
          id: 'CDA',
        },
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
        type: actions.COLL_TOGGLE_GROUP,
        payload: {
          id: 'politiek',
        },
      }),
      expectedState,
      'does not handle COLL_TOGGLE_GROUP very well'
    );
  });
});
