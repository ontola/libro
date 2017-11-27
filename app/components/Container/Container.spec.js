/* eslint no-magic-numbers: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';

import Container from './';

const comp = shallow((
  <Container>
    Content
  </Container>
));

describe('Container component', () => {
  it('Container should render', () => {
    assert.equal(comp.find('.Container').length, 1, 'Container does not render');
    assert.equal(comp.find('.Container').first().text(), 'Content', 'Children not displayed properly');
    assert.isTrue(comp.find('.Container').first().hasClass('Container--size-medium'), 'Medium size not applied by default');

    comp.setProps({ spacing: 'large' });
    assert.isTrue(comp.find('.Container').first().hasClass('Container--spacing-large'), 'No large spacing applied...');
  });
});
