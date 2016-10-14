/* eslint no-magic-numbers: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';

import Tag from './';

const comp = shallow(<Tag>Content</Tag>);

describe('Tag component', () => {
  it('Tag should render', () => {
    assert.equal(comp.find('.Tag').length, 1, 'Tag does not render');
    assert.equal(comp.find('.Tag__content').first().text(), 'Content', 'Content not displayed correctly');

    comp.setProps({ prefix: 'Heey', suffix: 'Hooi' });
    assert.equal(comp.find('.Tag__content--prefix').first().text(), 'Heey', 'Prefix not displayed correctly');
    assert.equal(comp.find('.Tag__content--suffix').first().text(), 'Hooi', 'Suffix not displayed correctly');
  });
});
