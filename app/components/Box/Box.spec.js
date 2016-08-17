import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';

import Box from './';

describe('A box', () => {
  it('contains children', () => {
    const wrapper = shallow(<Box>Joe</Box>);
    assert.isDefined(wrapper.props().children, 'Children have not been born yet...');
  });
});
