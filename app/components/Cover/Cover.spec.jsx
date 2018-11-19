import React from 'react';
import { shallow } from 'enzyme';

import Cover from '.';


describe('Cover component', () => {
  it('Cover should render', () => {
    const comp = shallow(<Cover>Content</Cover>);

    expect(comp.find('.Cover')).toExist();
    expect(comp.find('.Cover__content')).toHaveText('Content');
    expect(comp.find('.Cover').first()).toHaveClassName('Cover--default');

    expect(comp.find('.Cover').first()).toHaveStyle({
      backgroundColor: 'undefined',
      backgroundImage: 'none',
    });

    comp.setProps({
      image: 'http://placehold.it/50x50',
      overlayColor: 'red',
    });

    expect(comp.find('.Cover__overlay')).toExist();
    expect(comp.find('.Cover--image').first()).toHaveStyle({
      backgroundColor: 'undefined',
      backgroundImage: 'url(http://placehold.it/50x50)',
    });

    expect(comp.find('.Cover__overlay').first()).toHaveStyle({ backgroundColor: 'red' });
  });
});
