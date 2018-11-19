/* eslint no-magic-numbers: 0 */
import React from 'react';
import { mount } from 'enzyme';

import Drawer from '.';

describe('Drawer component', () => {
  it('should render', () => {
    const spy = jest.fn();
    const comp = mount(<Drawer hits={1337} onClickToggle={spy}>Content</Drawer>);

    expect(comp.find('.Drawer')).toExist();
    expect(comp.find('.Drawer__overlay')).toExist();
    expect(comp.find('.Drawer__container')).toExist();
    expect(comp.find('.Drawer__action')).toExist();

    comp.find('button.Button').simulate('click');
    expect(spy).toHaveBeenCalled();
    expect(comp.find('.Button').first()).toHaveText('Toon 1337 resultaten');
  });
});
