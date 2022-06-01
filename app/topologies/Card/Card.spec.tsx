/**
 * @jest-environment jsdom
 */

import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import React from 'react';

import { render } from '../../../tests/test-utils';
import CardActions from '../../modules/Common/components/Card/CardActions';
import CardContent from '../../modules/Common/components/Card/CardContent';
import themes from '../../themes';

import CardRow from './CardRow';

import Card from './';

describe('Card component', () => {
  it('Card should render', () => {
    const { getByText } = render(
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes.common({})}>
          <Card>
            Content
          </Card>
        </ThemeProvider>
      </StyledEngineProvider>,
    );
    expect(getByText('Content')).toBeVisible();
  });

  it('CardActions should render', () => {
    const { getByText } = render(
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes.common({})}>
          <CardActions>
            Content
          </CardActions>
        </ThemeProvider>
      </StyledEngineProvider>,
    );

    expect(getByText('Content')).toBeVisible();
  });

  it('CardContent should render', () => {
    const { getByText } = render(
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes.common({})}>
          <CardContent>
            Content
          </CardContent>
        </ThemeProvider>
      </StyledEngineProvider>,
    );

    expect(getByText('Content')).toBeVisible();
  });

  it('CardRow should render', () => {
    const { getByText } = render(
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes.common({})}>
          <CardRow backdrop>
            Content
          </CardRow>
        </ThemeProvider>
      </StyledEngineProvider>,
    );

    expect(getByText('Content')).toBeVisible();
  });
});
