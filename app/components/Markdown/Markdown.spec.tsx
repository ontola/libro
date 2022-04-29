/**
 * @jest-environment jsdom
 */

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { render } from '@testing-library/react';
import React from 'react';

import Markdown from '.';

describe('Markdown component', () => {
  it('Markdown should render highlight in uppercase', () => {
    const theme = createTheme();
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Markdown
          highlightedText="down str"
          text="markdown string"
        />
      </ThemeProvider>,
    );

    expect(getByText('DOWN STR')).toBeVisible();
  });
});
