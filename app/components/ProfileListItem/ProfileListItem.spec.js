/* eslint no-magic-numbers: 0 */
import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';

import ProfileListItem from './';

const comp = mount(<ProfileListItem
  link="https://argu.co"
  name="Matthew Obrien"
/>);

describe('ProfileListItem component', () => {
  it('ProfileListItem should render', () => {
    assert.equal(comp.find('.ProfileListItem').length, 1, 'ProfileListItem does not render');
    assert.equal(comp.find('.Heading').length, 1, 'ProfileListItem Heading does not render');
    assert.equal(comp.find('.Heading').first().text(), 'Matthew Obrien', 'ProfileListItem Heading not displayed correctly');

    comp.setProps({
      image: 'http://uinames.com/api/photos/male/40.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
    });

    assert.equal(comp.find('.ProfileListItem__image').length, 1, 'Image does not render');
    assert.equal(comp.find('.ProfileListItem__description').length, 1, 'Description does not render');
  });
});
