import {
  alpha,
  darken,
  lighten,
} from '@mui/material/styles';

import { Size } from '../../Kernel/lib/themes';

/* eslint-disable sort-keys */
export const SCREENSIZE = {
  xl: 1120,
  lg: 900,
  md: 650,
  sm: 320,
  xs: 0,
};
/* eslint-enable sort-keys */

const colorBaseGrey = 'rgb(128, 128, 128)';
const colorBaseBrown = 'rgb(134, 61, 61)';
const colorBaseGreen = 'rgb(84, 127, 75)';
const colorBaseBlue = 'rgb(71, 86, 104)';
const colorBaseRed = 'rgb(200, 20, 20)';
const colorBaseOrange = 'rgb(161, 98, 37)';

/* eslint-disable sort-keys, @typescript-eslint/no-magic-numbers */
// coefficient = (100 - (percentage * 2)) / 100
const colors = {
  black: {
    main: '#010101',
  },
  blue: {
    dark: darken(colorBaseBlue, 0.60),
    main: colorBaseBlue,
    midLight: lighten(colorBaseBlue, 0.10),
    light: lighten(colorBaseBlue, 0.60),
    power: '#0060d3',
  },
  brown: {
    dark: 'rgb(104, 71, 71)',
    main: colorBaseBrown,
    light: lighten(colorBaseBrown, 0.40),
    xLight: alpha(colorBaseBrown, 0.05),
  },
  green: {
    main: colorBaseGreen,
    light: lighten(colorBaseGreen, 0.40),
    xLight: alpha(colorBaseGreen, 0.1),
  },
  greyVoteButton: {
    main: '#707070',
  },
  grey: {
    xDark: '#010101',
    dark: '#212121',
    midDark: darken(colorBaseGrey, 0.40),
    main: colorBaseGrey,
    midLight: lighten(colorBaseGrey, 0.20),
    light: lighten(colorBaseGrey, 0.40),
    // xLight: lighten(colorBaseGrey, 0.80),
    xLight: 'rgb(230, 230, 230)',
    xxLight: lighten(colorBaseGrey, 0.94),
    xxLightForegroundSmall: '#707070',
    xxLightForegroundLarge: '#696969',
  },
  pink: {
    main: 'rgb(208, 2, 91)',
    light: 'rgb(255, 192, 203)',
    xLight: 'rgb(255, 223, 229)',
  },
  red: {
    dark: darken(colorBaseRed, 0.60),
    main: colorBaseRed,
    light: lighten(colorBaseRed, 0.60),
    xLight: alpha(colorBaseRed, 0.2),
  },
  transparent: {
    xxDark: alpha('rgb(0, 0, 0)', 0.5),
    xDark: alpha('rgb(0, 0, 0)', 0.15),
    dark: alpha('rgb(0, 0, 0)', 0.06),
    midDark: alpha('rgb(0, 0, 0)', 0.03),
    main: alpha('rgb(255, 255, 255)', 0.6),
    midLight: alpha('rgb(255, 255, 255)', 0.3),
    light: alpha('rgb(255, 255, 255)', 0.15),
    light7: alpha('rgb(255, 255, 255)', 0.7),
    light85: alpha('rgb(255, 255, 255)', 0.85),
    xLight: alpha('rgb(255, 255, 255)', 0.05),
    transparent: alpha('rgb(255, 255, 255)', 0),
  },
  white: {
    contrastText: 'rgba(0, 0, 0, 0.87)',
    main: '#FFFFFF',
  },
  orange: {
    dark: 'rgb(104, 93, 82)',
    main: colorBaseOrange,
    light: lighten(colorBaseOrange, 0.40),
    xLight: alpha(colorBaseOrange, 0.05),
  },
};
/* eslint-enable sort-keys, @typescript-eslint/no-magic-numbers */

//  6px = 0.375rem = 0.1875 * 2rem
const SIX_PX = 0.1875;

const theme = {
  appBar: {
    height: '2.5rem',
    iconBreakPoint: 'md',
    maxWidth: 'xl',
    position: 'fixed',
  },
  boxShadow: {
    base: '0 0 25px rgba(0, 0, 0, .06)',
    crazy: '0 0 20px 1px rgba(0, 0, 0, .3)',
    inside: '0 2px 8px rgba(0, 0, 0, .2) inset',
    intense: '0 2px 8px rgba(0, 0, 0, .2)',
    transparent: '0 0 0 rgba(0, 0, 0, 0)',
  },
  breakpoints: {
    values: SCREENSIZE,
  },
  containerDefaultSize: Size.Large,
  containerWidth: {
    large: '70rem',
    medium: '50rem',
    small: '35rem',
  },
  greyBorder: `solid 1px ${colors.grey.xLight}`,
  navBarFontSize: '.95em',
  // Palette defaults are overwritten by custom theming configuration
  palette: {
    background: {
      default: '#fbfbfb',
      paper: '#ffffff',
    },
    ...colors,
    link: {
      header: colors.grey.midDark,
      text: colors.blue.main,
    },
    primary: {
      main: colors.blue.main,
    },
    text: {
      disabled: colors.grey.midDark,
      hint: colors.red.main,
      primary: colors.grey.xDark,
      secondary: colors.grey.midDark,
    },
  },
  semanticColors: {
    'https://argu.co/ns/core#ConArgument': '#684747',
    'https://argu.co/ns/core#ProArgument': '#547f4b',
  },
  spacing: (factor: number): string => `${SIX_PX * factor}rem`,
  typography: {
    body1: {
      fontSize: '1rem',
    },
    fontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    /* eslint-disable sort-keys */
    fontSizes: {
      xSmall: '.75em',
      small: '.85em',
      medium: '1em',
      large: '1.125em',
      xLarge: '1.2em',
      xxLarge: '1.8em',
      xxxLarge: '2.6em',
    },
    /* eslint-enable sort-keys */
    fontWeightMedium: 600,
  },
  zIndex: {
    appBar: 910,
    drawer: 920,
    modal: 920,
  },
  zIndexFormInputButtons: 10,
  zIndexHoverBox: 100,
  zIndexLoader: 1200,
  zIndexOverlay: 1900,
};

export default theme;
