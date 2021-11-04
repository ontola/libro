/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import React from 'react';

import Spinner from '.';

describe('Spinner component', () => {
  it('Spinner should render', () => {
    const {  getByTestId } = render(<Spinner loading />);

    expect(getByTestId('spinner')).toBeVisible();
    expect(getByTestId('spinner')).toHaveClass('Spinner--loading');
  });
});
