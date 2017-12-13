/* eslint no-magic-numbers: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';

import CompareVotesBar from './';

const comp = shallow((
  <CompareVotesBar
    label="Label"
    tags={[{ label: 'Tag 1' }, { label: 'Tag 2' }, { label: 'Tag 3' }]}
    totalValue={97}
  >
    child
  </CompareVotesBar>));

describe('CompareVotesBar component', () => {
  it('CompareVotesBar should render', () => {
    assert.equal(comp.find('.CompareVotesBar').length, 1, 'CardRow does not render');
  });
});
