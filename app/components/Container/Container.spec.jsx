import { mount } from 'enzyme';
import React from 'react';

import Container from './';

describe('Container component', () => {
  it('Container should render', () => {
    const tree = mount((
      <Container>
        Content
      </Container>
    ));

    expect(tree.find('.Container')).toExist();
    expect(tree.find('.Container')).toHaveText('Content');
    expect(tree.find('.Container')).toHaveClassName('Container--size-medium');

    tree.setProps({ spacing: 'large' });
    expect(tree.find('.Container')).toHaveClassName('Container--spacing-large');
  });
});
