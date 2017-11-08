import chai, { assert } from 'chai';
import { Map } from 'immutable';
import chaiImmutable from 'chai-immutable';

import * as models from 'models';

import * as actions from '../action-types';

import motions from './reducer';

chai.use(chaiImmutable);

describe('Motions reducer', () => {
  it('should return the initial state', () => {
    const expectedState = new Map({
      items: new Map(),
    });

    assert.deepEqual(
      motions(undefined, {}),
      expectedState,
      'Initial state is not correct'
    );
  });

  it('should handle GET_MOTION', () => {
    const expectedResponse = new Map({
      items: new Map({
        14: new models.Motion({
          id: '14',
          loading: true,
        }),
      }),
    });

    assert.deepEqual(
      motions(undefined, {
        payload: {
          apiAction: true,
          endpoint: 'motions',
          id: '14',
        },
        type: actions.GET_MOTION,
      }),
      expectedResponse,
      'does not handle GET_MOTION very well'
    );
  });
});
