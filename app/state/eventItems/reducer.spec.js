import chai, { assert } from 'chai';
import { Map } from 'immutable';
import chaiImmutable from 'chai-immutable';

import eventItems from './reducer';
import * as models from 'models';
import * as actions from '../action-types';

chai.use(chaiImmutable);

describe('EventItem reducer', () => {
  it('should return the initial state', () => {
    const expectedState = new Map({
      items: new Map(),
    });

    assert.deepEqual(
      eventItems(undefined, {}),
      expectedState,
      'Initial state is not correct'
    );
  });

  it('should handle GET_EVENT_ITEM', () => {
    const expectedResponse = new Map({
      items: new Map({
        14: new models.EventItem({
          id: '14',
        }),
      }),
    });

    assert.deepEqual(
      eventItems(undefined, {
        type: actions.GET_EVENT_ITEM,
        payload: {
          apiAction: true,
          endpoint: 'eventItems',
          id: '14',
        },
      }),
      expectedResponse,
      'does not handle GET_EVENT_ITEM very well'
    );
  });
});
