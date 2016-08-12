import chai, { assert } from 'chai';
import { Map } from 'immutable';
import chaiImmutable from 'chai-immutable';

import argumentations from './reducer';
import * as models from 'models';
import * as actions from '../action-types';

chai.use(chaiImmutable);

describe('Arguments reducer', () => {
  it('should return the initial state', () => {
    const expectedState = new Map({
      items: new Map(),
    });

    assert.deepEqual(
      argumentations(undefined, {}),
      expectedState,
      'Initial state is not correct'
    );
  });

  it('should handle GET_ARGUMENT', () => {
    const expectedResponse = new Map({
      items: new Map({
        14: new models.Argument({
          id: '14',
        }),
      }),
    });

    assert.deepEqual(
      argumentations(undefined, {
        type: actions.GET_ARGUMENT,
        payload: {
          apiAction: true,
          endpoint: 'arguments',
          id: '14',
        },
      }),
      expectedResponse,
      'does not handle GET_ARGUMENT very well'
    );
  });
});
