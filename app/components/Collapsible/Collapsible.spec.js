/* eslint no-magic-numbers: 0 */
import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';
import sinon from 'sinon';

import Collapsible from './';

const comp = mount(
  <Collapsible
    trigger={<span>Click here</span>}
    visibleContent={<span>Content</span>}
  >Hoi</Collapsible>
);

describe('Collapsible component', () => {
  it('Collapsible should render', () => {
    assert.equal(comp.find('.Collapsible').length, 1, 'CardRow does not render');
    assert.equal(comp.find('.Collapsible__trigger span').first().html(), '<span>Click here</span>', 'Trigger does not render correctly');
    assert.equal(comp.find('.Collapsible__visible-content span').first().html(), '<span>Content</span>', 'VisibleContent does not render correctly');

    comp.setProps({ opened: true });
    assert.equal(comp.find('.Collapsible__invisible-content').first().text(), 'Hoi', 'Invisible content does not render when Collapsible is opened');

    const spy = sinon.spy(() => undefined);
    comp.setProps({ onClickToggle: spy });

    comp.find('.Collapsible__trigger').first().simulate('click');
    assert.isTrue(spy.called, 'Button click does not respond');
  });
});
