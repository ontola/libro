import chai, { assert } from 'chai';
import { Map } from 'immutable';
import chaiImmutable from 'chai-immutable';

import votes from './reducer';
import * as models from 'models';
import * as actions from '../action-types';

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
        type: actions.SET_VOTE,
        payload: {
          apiAction: true,
          endpoint: 'votes',
          motionId: '14',
          side: 'pro',
        },
      }),
      expectedResponse,
      'does not handle SET_VOTE very well'
    );
  });
});
