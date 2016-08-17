import chai, { assert } from 'chai';
import { List, Map } from 'immutable';
import chaiImmutable from 'chai-immutable';

import votematch from './reducer';
chai.use(chaiImmutable);

describe('Votematch reducer', () => {
  it('should return the initial state', () => {
    const expectedState = new Map({
      compareWithPerson: '',
      currentIndex: null,
      motionIds: new List(),
    });

    assert.deepEqual(
      votematch(undefined, {}),
      expectedState,
      'Initial state is not correct'
    );
  });
});
