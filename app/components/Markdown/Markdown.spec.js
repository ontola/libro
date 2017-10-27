/* eslint no-magic-numbers: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';

import Markdown from './';

const comp = shallow(
  <Markdown
    text="Joep is cool"
    highlightedText="Joe"
  />
);

describe('Markdown component', () => {
  it('Markdown should render', () => {
    assert.equal(comp.find('.Markdown').length, 1, 'Markdown does not render');
  });
});
