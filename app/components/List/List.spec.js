import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import { Map } from 'immutable';

import List from './';

const mockItems = ['1', '2', '3'];
const mockItemsObject = new Map({
  1: new Map({
    one: 'one',
  }),
  2: new Map({
    two: 'two',
  }),
  3: new Map({
    three: 'three',
  }),
});

const renderItem = (id) => <div key={id}>{id}</div>;
const wrapper = (items) => shallow(<List items={items} renderItem={renderItem} />);
const wrapperObjects = shallow(<List items={mockItemsObject} renderItem={renderItem} />);
const wrapperHorizontal = shallow(
  <List
    align="horizontal"
    items={mockItems}
    renderItem={renderItem}
  />
);

describe('List component', () => {
  it('should render all items in array/object', () => {
    assert.equal(
      mockItems.length,
      wrapper(mockItems).find('.List > div').length,
      'Items length does not equal to rendered list'
    );

    assert.equal(
      mockItemsObject.size,
      wrapperObjects.find('.List > div').length,
      'Items length does not equal to rendered list'
    );
  });

  it('should return false when there are no items to render', () => {
    assert.isFalse(wrapper([]).props().children, 'Array is not empty');
  });

  it('should render the list horizontally if declared so', () => {
    assert.include(
      wrapperHorizontal.props().className,
      'List--horizontal',
      'List is horizontal'
    );
  });
});
