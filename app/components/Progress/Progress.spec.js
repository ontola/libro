/* eslint no-magic-numbers: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';

import Progress from './';

const comp = shallow(<Progress completed={2} total={4} direction="down" />);

describe('Progress component', () => {
  it('Progress should render', () => {
    assert.equal(comp.find('.Progress').length, 1, 'Progress does not render');
    assert.equal(comp.find('.Progress--direction-down').length, 1, 'Progress__bar-background does not render');
    assert.deepEqual(
      comp.find('.Progress__completed').first().prop('style'),
      { height: '50%' },
      'Progress incorrect'
    );
  });
});
