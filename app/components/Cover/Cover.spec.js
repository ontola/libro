/* eslint no-magic-numbers: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';

import Cover from './';

const comp = shallow(<Cover>Content</Cover>);

describe('Cover component', () => {
  it('Cover should render', () => {
    assert.equal(comp.find('.Cover').length, 1, 'Cover does not render');
    assert.equal(comp.find('.Cover__content').first().text(), 'Content', 'Children not displayed properly');
    assert.isTrue(comp.find('.Cover').first().hasClass('Cover--default'), 'Type is not rendered properly');

    assert.deepEqual(
      comp.find('.Cover').first().prop('style'),
      { backgroundColor: 'undefined', backgroundImage: 'none' },
      'Incorrect default values for background image and color'
    );

    comp.setProps({
      image: 'http://placehold.it/50x50',
      overlayColor: 'red',
    });

    assert.equal(comp.find('.Cover__overlay').length, 1, 'Cover overlay does not render');
    assert.deepEqual(
      comp.find('.Cover--image').first().prop('style'),
      {
        backgroundColor: 'undefined',
        backgroundImage: 'url(http://placehold.it/50x50)',
      },
      'Background image does not render correctly'
    );

    assert.deepEqual(
      comp.find('.Cover__overlay').first().prop('style'),
      { backgroundColor: 'red' },
      'Overlay does not have the correct default color'
    );
  });
});
