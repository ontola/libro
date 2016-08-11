import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';
import App from './';

const wrapper = mount(<App />);

describe('Application', () => {
  it('contains a navbar', () => {
    assert.isNotNull(wrapper.find('nav'), 'Nav has not been found');
  });

  it('contains children', () => {
    assert.isNotNull(wrapper.props().children, 'Children have not been born yet...');
  });
});
