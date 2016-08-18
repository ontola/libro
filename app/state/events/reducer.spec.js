
import chai, { assert } from 'chai';
import { Map } from 'immutable';
import chaiImmutable from 'chai-immutable';

import events from './reducer';
import * as models from 'models';
import * as actions from '../action-types';

chai.use(chaiImmutable);

describe('Events reducer', () => {
  it('should return the initial state', () => {
    const expectedState = new Map({
      items: new Map(),
    });

    assert.deepEqual(
      events(undefined, {}),
      expectedState,
      'Initial state is not correct'
    );
  });

  it('should handle GET_EVENT', () => {
    const expectedResponse = new Map({
      items: new Map({
        14: new models.Event({
          id: '14',
          loading: true,
        }),
      }),
    });

    assert.deepEqual(
      events(undefined, {
        type: actions.GET_EVENT,
        payload: {
          apiAction: true,
          endpoint: 'events',
          id: '14',
        },
      }),
      expectedResponse,
      'does not handle GET_EVENT very well'
    );
  });
});
