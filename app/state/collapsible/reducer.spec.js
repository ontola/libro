import chai, { assert } from 'chai';
import { Map } from 'immutable';
import chaiImmutable from 'chai-immutable';

import collapsible from './reducer';
chai.use(chaiImmutable);

describe('Collapsible reducer', () => {
  it('should return the initial state', () => {
    const expectedState = new Map({
      items: new Map(),
    });

    assert.deepEqual(
      collapsible(undefined, {}),
      expectedState,
      'Initial state is not correct'
    );
  });
});
