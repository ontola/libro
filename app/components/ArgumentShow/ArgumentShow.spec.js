import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';

import ArgumentShow from './';

const argument = 'Liefst de container nog voor de zomer. De zakken stinken nu al de garage uit';
const comp = mount(
  <ArgumentShow
    createdAt={new Date()}
    title="Zakken stinken de garage uit"
    side="pro"
    text={argument}
  />
);

describe('ArgumentShow component', () => {
  it('should render', () => {
    assert.isAbove(comp.find('.Heading').first().length, 0, 'component does not render');
    assert.isAbove(comp.find('.CardHeader').first().length, 0, 'cardheader does not render');
    assert.isTrue(comp.find('.Heading').first().hasClass('Heading--pro'), 'heading has incorrect class');
    assert.isAbove(comp.find('.CardContent').first().length, 0, 'cardcontent does not render');
    assert.isAbove(comp.find('.CardActions').first().length, 0, 'cardactions does not render');
  });
});
