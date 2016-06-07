import React from 'react';
import { shallow, mount } from 'enzyme';
import { assert } from 'chai';

import App from './';

describe("Application", function() {
  it("contains a navbar", function() {
    const wrapper = shallow(<App/>);
    assert.isNotNull(wrapper.find('nav'), 'Nav has not been found');
  });

  it("contains children", function() {
    const wrapper = shallow(<App/>);
    assert.isNotNull(wrapper.props().children, 'Children have not been born yet...');
  });
});
