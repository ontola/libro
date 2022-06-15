/**
 * @jest-environment jsdom
 */

import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from '@mui/material/styles';
import { render } from '@testing-library/react';
import React from 'react';

import Markdown from './index';

describe('Markdown component', () => {
  it('Markdown should render highlight in uppercase', () => {
    const theme = createTheme();
    const { getByText } = render(
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Markdown
            highlightedText="down str"
            text="markdown string"
          />
        </ThemeProvider>
      </StyledEngineProvider>,
    );

    expect(getByText('DOWN STR')).toBeVisible();
  });
});
