import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import App from './';

describe('Application', () => {
  it('contains a navbar', () => {
    const wrapper = shallow(<App />);
    assert.isNotNull(wrapper.find('nav'), 'Nav has not been found');
  });

  it('contains children', () => {
    const wrapper = shallow(<App />);
    assert.isNotNull(wrapper.props().children, 'Children have not been born yet...');
  });

  it('contains a hovercard', () => {
    const wrapper = shallow(<App />);
    assert.isNotNull(wrapper.find('div.HoverCard'), 'Hovercard is not present');
  });
});
