/**
 * @jest-environment jsdom
 */

import { ThemeProvider } from '@mui/material/styles';
import React from 'react';

import CardActions from '../../components/Card/CardActions';
import CardContent from '../../components/Card/CardContent';
import { render } from '../../test-utils';
import themes from '../../themes';

import CardRow, { cardRowBackdropClassIdentifier } from './CardRow';

import Card from './';

describe('Card component', () => {
  it('Card should render', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.common({})}>
        <Card>
          Content
        </Card>
      </ThemeProvider>,
    );
    expect(getByTestId('card')).toBeVisible();
    expect(getByTestId('card')).toHaveTextContent('Content');
  });

  it('CardActions should render', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.common({})}>
        <CardActions>
          Content
        </CardActions>
      </ThemeProvider>,
    );

    expect(getByTestId('card-actions')).toBeVisible();
  });

  it('CardContent should render', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.common({})}>
        <CardContent>
          Content
        </CardContent>
      </ThemeProvider>,
    );

    expect(getByTestId('card-content')).toBeVisible();
    expect(getByTestId('card-content')).toHaveTextContent('Content');
  });

  it('CardRow should render', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.common({})}>
        <CardRow backdrop>
          Content
        </CardRow>
      </ThemeProvider>,
    );

    expect(getByTestId('card-row')).toBeVisible();
    expect(getByTestId('card-row')).toHaveTextContent('Content');
    expect(getByTestId('card-row')).toHaveClass(cardRowBackdropClassIdentifier);
  });
});
