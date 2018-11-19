import React from 'react';
import { shallow } from 'enzyme';

import Tag from '.';

describe('Tag component', () => {
  it('Tag should render', () => {
    const comp = shallow(<Tag>Content</Tag>);

    expect(comp.find('.Tag')).toExist();
    expect(comp.find('.Tag__content')).toHaveText('Content');

    comp.setProps({ prefix: 'Heey', suffix: 'Hooi' });
    expect(comp.find('.Tag__content--prefix').first()).toHaveText('Heey');
    expect(comp.find('.Tag__content--suffix').first()).toHaveText('Hooi');
  });
});
