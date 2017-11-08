import chai, { assert } from 'chai';
import chaiImmutable from 'chai-immutable';
import { Map } from 'immutable';

import * as models from 'models';

import {
  getArgs,
  getArguments,
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
      argu: new models.Argument({ id: 'argu', side: 'con', title: 'Kost te veel' }),
      ment: new models.Argument({ id: 'ment', side: 'pro', title: 'Zeer goed' }),
    }),
  }),
  motions: new Map({
    items: new Map({
      'test-motie-123': motion,
    }),
  }),
});

const stateNoArgs = new Map({
  argumentations: new Map({
    items: new Map({}),
  }),
  motions: new Map({
    items: new Map({
      'test-motie-123': motion,
    }),
  }),
});

const expectedState = new Map({
  argu: new models.Argument({ id: 'argu', side: 'con', title: 'Kost te veel' }),
  ment: new models.Argument({ id: 'ment', side: 'pro', title: 'Zeer goed' }),
});

const props = {
  motionId: 'test-motie-123',
};

describe('Arguments selectors', () => {
  it('should return all arguments', () => {
    assert.equal(getArguments(state), expectedState, 'Does not return arguments correctly');
  });

  it('should return only the correct arguments', () => {
    assert.deepEqual(
      getArgs('pro')(state, props),
      [new models.Argument({ id: 'ment', side: 'pro', title: 'Zeer goed' })],
      'does not return correct pro arguments'
    );

    assert.deepEqual(getArgs('con')(stateNoArgs, props), [], 'does not return correct con arguments');
  });
});
