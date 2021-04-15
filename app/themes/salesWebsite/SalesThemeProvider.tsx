import { createMuiTheme } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';

import variables from './theme/variables';

export interface PageTheme {
    headerTextColor: string;
}

export interface SalesTheme extends Theme {
    pages: { [k: string]: PageTheme };
    boxShadow: string;
}

const salesTheme = createMuiTheme(variables);

const SalesThemeProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={salesTheme}>
    {children}
  </ThemeProvider>
);

export function withSalesTheme<T>(Comp: React.ComponentType<T>) {
  return (props: T): JSX.Element => (
    <SalesThemeProvider>
      <Comp {...props} />
    </SalesThemeProvider>
  );
}
export default SalesThemeProvider;
