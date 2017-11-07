import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';

import HoverBox from '../HoverBox';

import ArgumentListItem from './';

const comp = mount(<ArgumentListItem
  side="pro"
  text="Liefst de container nog voor de zomer. De zakken stinken nu al de garage uit"
  title="Zakken stinken de garage uit"
/>);

describe('ArgumentListItem component', () => {
  it('should render', () => {
    assert.isTrue(
      comp.find('.ArgumentListItem').first().hasClass('ArgumentListItem--pro'),
      'component does not have the right classnames'
    );
    assert.isTrue(
      comp.find('.ArgumentListItem__icon').first().hasClass('fa-plus'),
      'Component does not show the correct icon'
    );
  });

  it('contains an <HoverBox/> component', () => {
    assert.isAbove(comp.find(HoverBox).length, 0, 'No Hoverbox found');
  });
});
