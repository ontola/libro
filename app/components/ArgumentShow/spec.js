import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';
import ArgumentShow from './';

const testData = {
  id: 3,
  side: 'pro',
  title: 'Niemand leest handleidingen',
  text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea',
};

describe('Argument', () => {
  it('contains data object', () => {
    const wrapper = mount(<ArgumentShow data={testData} />);
    assert.isObject(wrapper.props().data, 'No data object has been found');
  });

  it('is on the right side', () => {
    const wrapper = mount(<ArgumentShow data={testData} />);
    assert.isOk(wrapper.props().data.side, 'pro', 'Argument is on the wrong side');
  });
});
