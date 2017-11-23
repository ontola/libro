/* eslint no-magic-numbers: 0 */
import { assert } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { StaticRouter } from 'react-router';

import ProfileListItem from './';

const comp = mount((
  <StaticRouter context={{}}>
    <ProfileListItem
      description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor"
      image="http://uinames.com/api/photos/male/40.jpg"
      link="https://argu.co"
      name="Matthew Obrien"
    />
  </StaticRouter>
));

describe('ProfileListItem component', () => {
  it('should render', () => {
    assert.equal(comp.find('.ProfileListItem').length, 1, 'ProfileListItem does not render');
    assert.equal(comp.find('.Heading').length, 1, 'ProfileListItem Heading does not render');
    assert.equal(comp.find('.Heading').first().text(), 'Matthew Obrien', 'ProfileListItem Heading not displayed correctly');

    assert.equal(comp.find('.ProfileListItem__image').length, 1, 'Image does not render');
    assert.equal(comp.find('.ProfileListItem__description').length, 1, 'Description does not render');
  });
});
