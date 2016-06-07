import React from 'react';
import { shallow, mount } from 'enzyme';
import { assert } from 'chai';

import Argument from './';

const testData = {
  id: 3,
  side: 'pro',
  title: 'Niemand leest handleidingen',
  text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
};

describe("Argument", function() {
  it("contains data object", function() {
    const wrapper = mount(<Argument data={testData} />);
    assert.isObject(wrapper.props().data, 'No data object has been found');
  });

  it("is on the right side", function() {
    const wrapper = mount(<Argument data={testData} />);
    assert.isOk(wrapper.props().data.side, 'pro', 'Argument is on the wrong side');
  });
});
