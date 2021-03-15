import { createMuiTheme } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';

export interface PageTheme {
    headerTextColor: string;
}

export interface SalesTheme extends Theme {
    pages: { [k: string]: PageTheme };
    boxShadow: string;
}

const salesTheme = createMuiTheme({
  palette: {
    background: {
      default: '#FFF',
    },
    primary: {
      light: '#F8FBFF',
      main: '#2D7080',
    },
    secondary: {
      light: '#F8FBFF',
      main: '#B33A00',
    },
  },
  shape: {
    borderRadius: 5,
  },
  typography: {
    body1: {
      color: '000000',
      margin: 16,
    },
    body2: {
      color: '000000',
      margin: 24,
    },
    fontFamily: 'Open Sans',
    h1: {
      color: '000000',
      fontSize: 60,
      fontWeight: 'bold',
      margin: 20,
    },
    h2: {
      color: '000000',
      fontSize: 40,
      fontWeight: 'bold',
      margin: 20,
    },
    h3: {
      color: '000000',
      fontSize: 22,
      fontWeight: 'bold',
      margin: 20,
    },
    h4: {
      color: '000000',
      fontSize: 18,
      fontWeight: 'bold',
      margin: 20,
    },
  },
});

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
