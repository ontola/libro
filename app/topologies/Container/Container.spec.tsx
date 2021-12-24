/**
 * @jest-environment jsdom
 */

import React from 'react';

import { Size } from '../../components/shared/config';
import { render } from '../../test-utils';

import Container from '.';

describe('Container component', () => {
  it('Container should render', () => {
    const { getByTestId, rerender } = render((
      <Container>
        Content
      </Container>
    ));

    expect(getByTestId('container-root')).toBeVisible();
    expect(getByTestId('container-root')).toHaveTextContent('Content');
    expect(getByTestId('container-root')).toHaveClass('MuiContainer-maxWidthLg');

    rerender((
      <Container size={Size.Large}>
        Content
      </Container>
    ));

    expect(getByTestId('container-root')).toHaveClass('MuiContainer-maxWidthXl');
  });
});