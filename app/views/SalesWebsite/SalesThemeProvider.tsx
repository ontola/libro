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
  // desktop fontsize: H1 50, H2 37, H3 24,
  // mobiel H1 30, H2 27, H3 20
  // overal tekst 18
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
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
      color: '000000',
      fontSize: '3.125rem',
      fontWeight: 'bold',
      margin: 20,
    },
    h2: {
      '@media (max-width:600px)': {
        fontSize: '1.69rem',
      },
      color: '000000',
      fontSize: '2.31rem',
      fontWeight: 'bold',
      margin: 20,
    },
    h3: {
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
      color: '000000',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    subtitle1: {
      color: '000000',
      fontSize: '1.125rem',
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
