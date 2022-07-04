/**
 * @jest-environment jsdom
 */

import React from 'react';

import { render } from '../../../../../tests/test-utils';
import { Size } from '../../../Kernel/lib/themes';

import Container from './index';

describe('Container component', () => {
  it('Container should render', () => {
    const { getByTestId, rerender } = render((
      <Container>
        Content
      </Container>
    ));

    expect(getByTestId('container-root')).toBeVisible();
    expect(getByTestId('container-root')).toHaveTextContent('Content');
    expect(getByTestId('container-root')).toHaveClass('MuiContainer-maxWidthXl');

    rerender((
      <Container size={Size.Medium}>
        Content
      </Container>
    ));

    expect(getByTestId('container-root')).toHaveClass('MuiContainer-maxWidthLg');
  });
});
