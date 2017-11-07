/* eslint no-magic-numbers: 0 */
import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';

import BackButton from './';

const comp = mount(<BackButton link="http://argu.co/">Go back</BackButton>);

describe('BackButton component', () => {
  it('should render', () => {
    assert.equal(comp.find('Link.BackButton').length, 1, 'component does not render');
    assert.isTrue(comp.find('.fa').hasClass('fa-th'), 'component should have correct icon');
  });
});
