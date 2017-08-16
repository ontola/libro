/* eslint no-magic-numbers: 0 */
import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';
import { generateContext } from 'link-redux/test/utilities';

import ProfileCard from './';

describe('ProfileCard component', () => {
  it('ProfileCard should render', () => {
    const comp = mount(
      <ProfileCard name="Matthew Obrien" />,
      generateContext({ linkedRenderStore: true, schemaObject: true })
    );

    assert.equal(comp.find('.ProfileCard').length, 1, 'ProfileCard does not render');
    assert.equal(comp.find('.Heading').length, 1, 'Profile heading does not render');
    assert.equal(comp.find('.Heading').first().text(), 'Matthew Obrien', 'Heading does not render correct title');
    assert.equal(comp.find('.ProfileCard__foot').length, 1, 'Footer does not render');
  });

  it('renders party members', () => {
    const comp = mount(
      <ProfileCard
        name="Matthew Obrien"
        party="D66"
        image="http://uinames.com/api/photos/male/40.jpg"
        bio="Trololol"
        similarity={65}
      />,
      generateContext({ linkedRenderStore: true, schemaObject: true })
    );
    assert.equal(comp.find('.ProfileCard__party').first().text(), 'D66', 'Does not display party correctly');
    assert.deepEqual(
      comp.find('.ProfileCard__image').first().prop('style'),
      { backgroundImage: 'url(http://uinames.com/api/photos/male/40.jpg)' },
      'Does not display party correctly'
    );

    assert.equal(comp.find('.ProfileCard__similarity').length, 1, 'Does not render similarity');
    assert.equal(comp.find('.Button').length, 0, 'Displays voteMatch button while it shouldnt');
  });
});
