import { ThemeOptions } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import deepmerge from 'deepmerge';

import variables from '../../common/theme/variables';

const SIX_PX = 0.1875;

const components = {
  MuiButton: {
    styleOverrides: {
      iconSizeMedium: {
        '& > *:first-child': {
          fontSize: 'inherit',
        },
        fontSize: '1.6em',
        marginLeft: 0,
      },
    },
  },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        fontWeight: 'bold',
        verticalAlign: 'middle',
      },
    },
  },
};

const palette = {
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
};

const typography: TypographyOptions = {
  body1: {
    color: '000',
    // fontSize: 18
    fontSize: '1.125rem',
    marginBottom: 14,
  },
  body2: {
    color: '000',
    // fontSize: 18
    fontSize: '1.125rem',
    marginBottom: 14,
  },
  button: {
    textTransform: 'none',
  },
  fontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontWeightMedium: 600,
  h1: {
    color: '000',
    // Fontsize: 50
    fontSize: '3.125rem',
    fontWeight: 'bold',
    marginBottom: 24,
  },
  h2: {
    color: '000',
    // Fontsize: 37
    fontSize: '2.31rem',
    fontWeight: 'bold',
    marginBottom: 24,
  },
  h3: {
    // Fontsize desktop: 24, mobile: 20
    color: '000',
    // Fontsize: 24
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  subtitle1: {
    color: '000',
    // fontSize: 18
    fontSize: '1.125rem',
    marginBottom: 24,
  },
};

const breakpoints = {
  /* eslint-disable sort-keys */
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
  /* eslint-enable sort-keys */
};

const customVariables: ThemeOptions = {
  breakpoints,
  components,
  palette,
  shape: {
    borderRadius: 5,
  },
  spacing: (factor: number) => `${SIX_PX * factor}rem`,
  typography,
};

export default deepmerge(variables, customVariables);
