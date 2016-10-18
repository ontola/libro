/* eslint no-magic-numbers: 0 */
import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';
import sinon from 'sinon';

import Drawer from './';

const spy = sinon.spy(() => undefined);
const comp = mount(<Drawer hits={1337} onClickToggle={spy}>Content</Drawer>);

describe('Drawer component', () => {
  it('should render', () => {
    assert.equal(comp.find('.Drawer').length, 1, 'Drawer does not render');
    assert.equal(comp.find('.Drawer__overlay').length, 1, 'Drawer__overlay does not render');
    assert.equal(comp.find('.Drawer__container').length, 1, 'Drawer__container does not render');
    assert.equal(comp.find('.Drawer__action').length, 1, 'Drawer__action does not render');

    comp.find('.Button').simulate('click');
    assert.isTrue(spy.called, 'Button onClick does not work');
    assert.equal(comp.find('.Button').first().text(), 'Toon 1337 resultaten', 'Button does not display correct text');
  });
});
