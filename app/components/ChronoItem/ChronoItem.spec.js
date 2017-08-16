/* eslint no-magic-numbers: 0 */
import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';
import { generateContext } from 'link-redux/test/utilities';

import ChronoItem from './';

const comp = mount(
  <ChronoItem
    attributionText="joe"
    currentDate={new Date()}
    endDate={new Date()}
    startDate={new Date()}
    text="Joe"
  />,
  generateContext({ linkedRenderStore: true, schemaObject: true })
);

describe('ChronoItem component', () => {
  it('ChronoItem should render', () => {
    assert.equal(comp.find('.CardRow').length, 1, 'CardRow does not render');
    assert.equal(comp.find('.DetailsBar').length, 1, 'DetailsBar does not render');
    assert.equal(comp.find('.Detail').length, 2, 'Does not render right amount of details');
  });
});
