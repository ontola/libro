import { mount } from 'enzyme';
import React from 'react';
import { StaticRouter } from 'react-router';

import ProfileListItem from '.';


describe('ProfileListItem component', () => {
  it('should render', () => {
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

    expect(comp.find('.ProfileListItem')).toExist();
    expect(comp.find('.Heading')).toExist();
    expect(comp.find('.Heading').first()).toHaveText('Matthew Obrien');

    expect(comp.find('.ProfileListItem__image')).toExist();
    expect(comp.find('.ProfileListItem__description')).toExist();
  });
});
