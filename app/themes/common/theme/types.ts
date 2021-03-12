import { colors } from './variables';

export interface LibroColors extends DeepPartial<(typeof colors)> {
  background: {
    /** Main background color */
    default: string,
    /** Background color inside paper / cards */
    paper: string,
  },
  primary: {
    /** The number one primary color of the theme */
    main: string,
  },
  link: {
    /** The color of clickable headers */
    header: string,
  },
  text: {
    disabled: string,
    hint: string,
    primary: string,
    secondary: string,
  },
}

/** Theme settings for Libro apps */
export interface LibroTheme {
  appBar: {
    height: string,
    /** A breakpoint width, e.g. 'xs' or 'sm' */
    iconBreakPoint: string,
    /** A breakpoint width, e.g. 'xs' or 'sm' */
    maxWidth: string,
    /** If the navar is sticky or not (e.g. 'fixed' or 'relative') */
    position: string,
  },
  breakpoints: {
    /* eslint-disable sort-keys */
    values: {
      xs: number,
      sm: number,
      md: number,
      lg: number,
      xl: number,
    },
    /* eslint-enable sort-keys */
  },
  containerWidth: {
    large: string,
    medium: string,
    small: string,
  },
  border: {
    /** Border radius for things like cards, e.g. 5px */
    radius: string,
    /** Border style for cards and other floating items, e.g. 'solid 1px red' */
    style: string,
    /** Border style for cards when interactive and hovering */
    styleHover: string,
  },
  palette: LibroColors,
  /** Function for calculating margins */
  spacing: (factor: number) => string,
  typography: {
    body1: {
      fontSize: string,
    },
    fontFamily: string,
  },
}

/** Make all properties of a type recursively partial */
type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
