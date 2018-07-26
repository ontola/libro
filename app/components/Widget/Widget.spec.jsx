/* eslint no-magic-numbers: 0 */
import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';

import Widget from ".";

const comp = mount(<Widget description="Beschrijving" title="Titel">Content</Widget>);

describe('Widget component', () => {
  it('Widget should render', () => {
    assert.equal(comp.find('.Widget').length, 1, 'Widget does not render');
    assert.equal(comp.find('.Heading').first().text(), 'Titel', 'Title not displayed correctly');
    assert.equal(comp.find('.Widget__description').first().text(), 'Beschrijving', 'Desc not correct');
    assert.equal(comp.find('.Card').length, 1, 'Children not displayed');
    assert.equal(comp.find('.Card').first().text(), 'Content', 'Children not displayed correctly');
  });
});
