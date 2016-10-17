/* eslint no-magic-numbers: 0 */
import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';

import Box from './';

const comp = mount(
  <Box>Content</Box>
);

describe('Box component', () => {
  it('should render', () => {
    assert.equal(comp.find('.Card').length, 1, 'card does not render');
    assert.equal(comp.find('.CardContent').length, 1, 'cardcontent does not render');
    assert.equal(comp.find('.CardContent').text(), 'Content', 'box does not render children correctly');
  });
});
