import React from 'react';
import { mount } from 'enzyme';

import Widget from '.';

describe('Widget component', () => {
  it('Widget should render', () => {
    const comp = mount(<Widget description="Beschrijving" title="Titel">Content</Widget>);

    expect(comp.find('.Widget')).toExist();
    expect(comp.find('.Heading').first()).toHaveText('Titel');
    expect(comp.find('.Widget__description').first()).toHaveText('Beschrijving');
    expect(comp.find('.Card')).toExist();
    expect(comp.find('.Card').first()).toHaveText('Content');
  });
});
