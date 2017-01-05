import chai, { assert } from 'chai';
import { Map } from 'immutable';
import chaiImmutable from 'chai-immutable';

import voteMatch from './reducer';

chai.use(chaiImmutable);

describe('Votematch reducer', () => {
  it('should return the initial state', () => {
    const expectedState = new Map({
      currentIndex: 0,
      currentVoteMatch: null,
      items: new Map(),
    });

    assert.deepEqual(
      voteMatch(undefined, {}),
      expectedState,
      'Initial state is not correct'
    );
  });
});
