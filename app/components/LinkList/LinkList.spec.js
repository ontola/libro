import { assert } from 'chai';
import { mount } from 'enzyme';
import React from 'react';

import LinkList from './';

const links = [{
  label: 'Test 1',
  to: '/test1',
}, {
  label: 'Test 2',
  to: '/test2',
}];

describe('A navigation bar', () => {
  it('must contain one or more links', () => {
    const wrapper = mount(<LinkList links={links} />);
    const findLinks = wrapper.find('nav a');
    assert(findLinks.length > 0, 'No links have been found');
  });
});
