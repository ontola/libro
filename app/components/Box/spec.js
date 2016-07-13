import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';

import Box from './';

describe('A box', () => {
  it('contains children that are react components', () => {
    const wrapper = shallow(<Box>joe</Box>);
    assert.isDefined(wrapper.props().children, 'Children have not been born yet...');
  });

  it('has bem modifier \'ghost\' when proporty ghost is true', () => {
    const wrapper = shallow(<Box ghost />);
    assert.include(
      wrapper.props().className,
      'Box--ghost',
      'Box does not have classname Box--ghost while it must have'
    );
  });
});
