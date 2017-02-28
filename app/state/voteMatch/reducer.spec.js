import chai, { assert } from 'chai';
import { Map, List } from 'immutable';
import chaiImmutable from 'chai-immutable';

import voteMatch from './reducer';

chai.use(chaiImmutable);

describe('Votematch reducer', () => {
  it('should return the initial state', () => {
    const expectedState = new Map({
      currentIndex: null,
      currentVoteMatch: null,
      items: new Map({
        LocalVoteMatch: new Map({
          voteables: new List(),
        }),
      }),
    });

    assert.deepEqual(
      voteMatch(undefined, {}),
      expectedState,
      'Initial state is not correct'
    );
  });
});
