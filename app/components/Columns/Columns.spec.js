import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';

import Columns from './';

describe('Columns component', () => {
  const wrapper = shallow(<Columns><div>Joe</div><div>Joe</div></Columns>);

  it('should render at least 2 Columns', () => {
    assert.isAbove(
      wrapper.find('.Column').length,
      1,
      'Columns does not have enough Column elements'
    );
  });
});
