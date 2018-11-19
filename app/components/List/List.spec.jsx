import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';

import List from '.';

describe('List component', () => {
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

  const renderItem = id => <div key={id}>{id}</div>;
  const wrapper = items => shallow(<List items={items} renderItem={renderItem} />);
  const wrapperObjects = shallow(<List items={mockItemsObject} renderItem={renderItem} />);
  const wrapperHorizontal = shallow(<List
    align="horizontal"
    items={mockItems}
    renderItem={renderItem}
  />);

  it('should render all items in array/object', () => {
    expect(wrapper(mockItems).find('.List > div')).toHaveLength(mockItems.length);

    expect(wrapperObjects.find('.List > div')).toHaveLength(mockItemsObject.size);
  });

  it('should return false when there are no items to render', () => {
    expect(wrapper([])).toHaveProp('children', false);
  });

  it('should render the list horizontally if declared so', () => {
    expect(wrapperHorizontal).toHaveClassName('List--horizontal');
  });
});
