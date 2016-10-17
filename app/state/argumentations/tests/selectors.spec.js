import chai, { assert } from 'chai';
import { Map } from 'immutable';
import chaiImmutable from 'chai-immutable';

import * as models from 'models';
import {
  getArguments,
  getArgs,
  // getArgsPro,
  // getArgsCon,
} from '../selectors';

chai.use(chaiImmutable);

const motion = new models.Motion({
  arguments: ['argu', 'ment'],
  id: 'test-motie-123',
  title: 'Dit is een test motie',
});

const state = new Map({
  argumentations: new Map({
    items: new Map({
      argu: new models.Argument({ id: 'argu', title: 'Kost te veel', side: 'con' }),
      ment: new models.Argument({ id: 'ment', title: 'Zeer goed', side: 'pro' }),
    }),
  }),
  motions: new Map({
    items: new Map({
      'test-motie-123': motion,
    }),
  }),
});

const props = {
  motionId: 'test-motie-123',
};

describe('Arguments selectors', () => {
  const expectedState = new Map({
    argu: new models.Argument({ id: 'argu', title: 'Kost te veel', side: 'con' }),
    ment: new models.Argument({ id: 'ment', title: 'Zeer goed', side: 'pro' }),
  });

  it('should return all arguments', () => {
    assert.equal(
      getArguments(state),
      expectedState,
      'Does not return arguments correctly'
    );
  });

  it('should return only the correct arguments', () => {
    assert.deepEqual(
      getArgs('pro')(state, props),
      [new models.Argument({ id: 'ment', title: 'Zeer goed', side: 'pro' })],
      'does not return correct pro arguments'
    );

    assert.deepEqual(
      getArgs('con')(state, props),
      [new models.Argument({ id: 'argu', title: 'Kost te veel', side: 'con' })],
      'does not return correct con arguments'
    );

    assert.deepEqual(
      [],
      [],
      'does not return correct con arguments'
    );
  });
});
