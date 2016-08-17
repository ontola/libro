import React from 'react';
import { render, shallow } from 'enzyme';
import { assert } from 'chai';

import Button from './';

describe('Button component', () => {
  const button = shallow(<Button children="joe" />);
  const buttonWithIcon = render(<Button children="joe" icon="lightbulb-o" />);

  it('should have children', () => {
    assert.isAbove(button.find('button').children().length, 0, 'Button has no label');
  });
  it('should have no icon by default', () => {
    assert.equal(button.find('.fa').length, 0, 'Icon has been found');
  });
  it('with icon prop has icon', () => {
    assert.equal(buttonWithIcon.find('.fa').length, 1, 'No icon has been found');
  });
});
