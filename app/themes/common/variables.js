import {
  darken,
  fade,
  lighten,
} from '@material-ui/core/styles/colorManipulator';
import { createMuiTheme } from '@material-ui/core';

const colorBaseGrey = 'rgb(128, 128, 128)';
const colorBaseBrown = 'rgb(134, 61, 61)';
const colorBaseGreen = 'rgb(84, 127, 75)';
const colorBaseBlue = 'rgb(71, 86, 104)';
const colorBaseRed = 'rgb(200, 20, 20)';
const colorBaseOrange = 'rgb(161, 98, 37)';

/* eslint-disable sort-keys, no-magic-numbers */
// coefficient = (100 - (percentage * 2)) / 100
const colors = {
  black: {
    base: 'rgb(0, 0, 0)',
  },
  blue: {
    dark: darken(colorBaseBlue, 0.60),
    base: colorBaseBlue,
    midLight: lighten(colorBaseBlue, 0.90),
    light: lighten(colorBaseBlue, 0.40),
    xLight: 'rgb(238, 240, 242)',
    power: '#0060d3',
  },
  brown: {
    dark: 'rgb(104, 71, 71)',
    base: colorBaseBrown,
    light: lighten(colorBaseBrown, 0.60),
    xLight: fade(colorBaseBrown, 0.05),
  },
  green: {
    base: colorBaseGreen,
    light: lighten(colorBaseGreen, 0.60),
    xLight: fade(colorBaseGreen, 0.1),
  },
  greyVoteButton: {
    base: '#707070',
  },
  grey: {
    dark: darken(colorBaseGrey, 0.99),
    midDark: darken(colorBaseGrey, 0.60),
    base: colorBaseGrey,
    midLight: lighten(colorBaseGrey, 0.80),
    light: lighten(colorBaseGrey, 0.60),
    // xLight: lighten(colorBaseGrey, 0.20),
    xLight: 'rgb(230, 230, 230)',
    xxLight: lighten(colorBaseGrey, 0.06),
    xxLightForegroundSmall: '#707070',
    xxLightForegroundLarge: '#696969',
  },
  pink: {
    base: 'rgb(208, 2, 91)',
    light: 'rgb(255, 192, 203)',
    xLight: 'rgb(255, 223, 229)',
  },
  red: {
    dark: darken(colorBaseRed, 0.60),
    base: colorBaseRed,
    light: lighten(colorBaseRed, 0.40),
    xLight: fade(colorBaseRed, 0.2),
  },
  transparent: {
    xxDark: fade('rgb(0, 0, 0)', 0.5),
    xDark: fade('rgb(0, 0, 0)', 0.15),
    dark: fade('rgb(0, 0, 0)', 0.06),
    midDark: fade('rgb(0, 0, 0)', 0.03),
    base: fade('rgb(255, 255, 255)', 0.6),
    midLight: fade('rgb(255, 255, 255)', 0.3),
    light: fade('rgb(255, 255, 255)', 0.15),
    xLight: fade('rgb(255, 255, 255)', 0.05),
    transparent: fade('rgb(255, 255, 255)', 0),
  },
  white: {
    base: 'rgb(255, 255, 255)',
  },
  orange: {
    dark: 'rgb(104, 93, 82)',
    base: colorBaseOrange,
    light: lighten(colorBaseOrange, 0.60),
    xLight: fade(colorBaseOrange, 0.05),
  },
};
/* eslint-enable sort-keys, no-magic-numbers */

const theme = createMuiTheme({
  // Palette defaults are overwritten by custom theming configuration
  palette: {
    background: {
      default: colors.blue.xLight,
      paper: colors.white.base,
    },
    primary: {
      contrastText: colors.white.base,
      main: colors.blue.base,
    },
    text: {
      disabled: colors.grey.midDark,
      hint: colors.red.base,
      primary: colors.grey.dark,
      secondary: colors.grey.midDark,
    },
  },
  typography: {
    body1: {
      fontSize: '15px',
    },
    fontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontSize: 16,
  },
});

export default {
  ...colors,
  theme,
};
