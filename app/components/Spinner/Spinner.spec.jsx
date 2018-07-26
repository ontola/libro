/* eslint no-magic-numbers: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';

import Spinner from '.';

const comp = shallow(<Spinner loading />);

describe('Spinner component', () => {
  it('Spinner should render', () => {
    assert.equal(comp.find('.Spinner').length, 1, 'Spinner does not render');
    assert.isTrue(comp.find('.Spinner').first().hasClass('Spinner--loading'), 'Loading class not displayed correctly');
  });
});
