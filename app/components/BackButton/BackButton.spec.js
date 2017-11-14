/* eslint no-magic-numbers: 0 */
import { assert } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { StaticRouter } from 'react-router';

import BackButton from './';

const comp = mount((
  <StaticRouter context={{}}>
    <BackButton link="http://argu.co/">Go back</BackButton>
  </StaticRouter>
));

describe('BackButton component', () => {
  it('should render', () => {
    assert.equal(comp.find('Link.BackButton').length, 1, 'component does not render');
    assert.isTrue(comp.find('.fa').hasClass('fa-th'), 'component should have correct icon');
  });
});
