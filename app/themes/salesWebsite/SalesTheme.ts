import { LibroTheme } from '../themes';

export interface PageTheme {
    headerTextColor: string;
}

export interface SalesTheme extends LibroTheme {
    pages: { [k: string]: PageTheme };
    boxShadow: string;
}
