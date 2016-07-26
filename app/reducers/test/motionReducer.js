import chai, { assert } from 'chai';
import { Map } from 'immutable';
import chaiImmutable from 'chai-immutable';

chai.use(chaiImmutable);

import motions from '../../reducers/motions';
import * as models from '../../models';
import * as actions from '../../constants/actionTypes';

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
        }),
      }),
    });

    assert.deepEqual(
      motions(undefined, {
        type: actions.GET_MOTION,
        payload: {
          apiAction: true,
          endpoint: 'motions',
          id: '14',
        },
      }),
      expectedResponse,
      'does not handle GET_MOTION very well'
    );
  });
});
