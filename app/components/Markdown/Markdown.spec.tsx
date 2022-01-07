/**
 * @jest-environment jsdom
 */

import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
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
