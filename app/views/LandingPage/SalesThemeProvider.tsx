import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';

export interface PageTheme {
    headerTextColor: string;
}

export interface SalesTheme {
    pages: { [k: string]: PageTheme };
}

declare module '@material-ui/core' {
    // tslint:disable-next-line:no-empty-interface
    interface Theme extends SalesTheme {}
}

const salesTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#2D7080',
        },
    },
    typography: {
        body1: {
            align: 'justify',
            color: '000000',
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
