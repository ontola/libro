import React from 'react';
import { shallow, mount } from 'enzyme';
import { assert } from 'chai';
import Navigation from './';

const links = [
  {
    label: 'Test 1',
    to: '/test1',
  },
  {
    label: 'Test 2',
    to: '/test2',
  },
];

describe('A navigation bar', () => {
  it('must contain one or more links', () => {
    const wrapper = mount(<Navigation links={links} />);
    const findLinks = wrapper.find('nav a');
    assert(findLinks.length > 0, 'No links have been found');
  });

  it('has classname \'Navigation--fullwidth\' when proporty fullwidth is true', () => {
    const wrapper = shallow(<Navigation links={links} fullwidth />);
    const className = 'Navigation--fullwidth';
    const findClass = wrapper.find(`nav.${className}`);
    assert.isOk(
      findClass,
      `The fullwidth navigation bar does not have the correct classname: ${className}`
    );
  });
});
