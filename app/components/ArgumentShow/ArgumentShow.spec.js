import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';
import ArgumentShow from './';

const testData = {
  id: 3,
  side: 'pro',
  title: 'Niemand leest handleidingen',
  content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex',
};

const wrapper = mount(
  <ArgumentShow
    side={testData.side}
    title={testData.title}
    content={testData.content}
  />
);

describe('Argument', () => {
  it('renders heading, content and action buttons', () => {
    assert.isDefined(wrapper.find('.Heading'), 'has no required heading');
    assert.isDefined(wrapper.find('.Box__actions button'), 'has no required buttons');
  });
});
