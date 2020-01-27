import { mount } from 'enzyme';
import React from 'react';

import Container from '.';

describe('Container component', () => {
  it('Container should render', () => {
    const tree = mount((
      <Container>
        Content
      </Container>
    ));

    expect(tree.find('.MuiContainer-root')).toExist();
    expect(tree.find('.MuiContainer-root')).toHaveText('Content');
    expect(tree.find('.MuiContainer-root')).toHaveClassName('MuiContainer-maxWidthLg');

    tree.setProps({ size: 'large' });
    expect(tree.find('.MuiContainer-root')).toHaveClassName('MuiContainer-maxWidthXl');
  });
});
