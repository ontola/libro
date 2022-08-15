/**
 * @jest-environment jsdom
 */

import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import React from 'react';

import { render } from '../../../../../tests/test-utils';
import themes from '../../../../themes';
import CardActions from '../../components/Card/CardActions';
import CardContent from '../../components/Card/CardContent';

import CardRow from './CardRow';

import Card from './index';

describe('Card component', () => {
  it('Card should render', async () => {
    const { getByText } = await render(
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

  it('CardActions should render', async () => {
    const { getByText } = await render(
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

  it('CardContent should render', async () => {
    const { getByText } = await render(
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

  it('CardRow should render', async () => {
    const { getByText } = await render(
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
