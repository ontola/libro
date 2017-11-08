import chai, { assert } from 'chai';
import { Map } from 'immutable';
import chaiImmutable from 'chai-immutable';

import * as models from 'models';

import * as actions from '../action-types';

import votes from './reducer';

chai.use(chaiImmutable);

describe('Votes reducer', () => {
  it('should handle SET_VOTE', () => {
    const expectedResponse = new Map({
      items: new Map(),
      userVotes: new Map({
        14: new models.Vote({
          id: '14',
          individual: true,
          option: 'pro',
        }),
      }),
    });

    assert.deepEqual(
      votes(undefined, {
        payload: {
          apiAction: true,
          endpoint: 'votes',
          motionId: '14',
          side: 'pro',
        },
        type: actions.SET_VOTE,
      }),
      expectedResponse,
      'does not handle SET_VOTE very well'
    );
  });
});
