import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';

export interface PageTheme {
    headerTextColor: string;
}

export interface SalesTheme {
    pages: { [k: string]: PageTheme };
    boxShadow: string;
}

declare module '@material-ui/core' {
    // tslint:disable-next-line:no-empty-interface
    interface Theme extends SalesTheme { }
}

const salesTheme = createMuiTheme({
    palette: {
        background: {
            default: '#FFF',
        },
        primary: {
            main: '#2D7080',
            light: '#F8FBFF',
        },
        secondary: {
            light: '#F8FBFF',
            main: '#B33A00',
        },
    },
    typography: {
        body1: {
            align: 'justify',
            alignSelf: 'center',
            color: '000000',
            margin: 16,
        },
        fontFamily: 'Open Sans',
        h1: {
            align: 'justify',
            color: '000000',
            fontSize: 60,
            fontWeight: 'bold',
            margin: 20,
        },
        h2: {
            align: 'justify',
            color: '000000',
            fontSize: 40,
            fontWeight: 'bold',
            margin: 20,
        },
        h3: {
            align: 'justify',
            color: '000000',
            fontSize: 30,
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
    return (props: T) => (
        <SalesThemeProvider>
            <Comp {...props} />
        </SalesThemeProvider>
    );
}
export default SalesThemeProvider;
