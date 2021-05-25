import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { TypographyOptions } from '@material-ui/core/styles/createTypography';
import { Overrides } from '@material-ui/core/styles/overrides';

const overrides: Overrides = {
  MuiButton: {
    iconSizeMedium: {
      '& > *:first-child': {
        fontSize: 'inherit',
      },
      fontSize: '1.6em',
      marginLeft: 0,
    },
  },
  MuiSvgIcon: {
    root: {
      fontWeight: 'bold',
      verticalAlign: 'middle',
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
    margin: 10,
    marginBottom: 14,
  },
  body2: {
    color: '000',
    // fontSize: 18
    fontSize: '1.125rem',
    margin: 10,
    marginBottom: 14,
  },
  button: {
    textTransform: 'none',
  },
  fontFamily: 'Open Sans',
  h1: {
    color: '000',
    // Fontsize: 50
    fontSize: '3.125rem',
    fontWeight: 'bold',
    margin: 10,
    marginBottom: 24,
  },
  h2: {
    color: '000',
    // Fontsize: 37
    fontSize: '2.31rem',
    fontWeight: 'bold',
    margin: 10,
    marginBottom: 24,
  },
  h3: {
    // Fontsize desktop: 24, mobile: 20
    color: '000',
    // Fontsize: 24
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 10,
  },
  subtitle1: {
    color: '000',
    // fontSize: 18
    fontSize: '1.125rem',
    margin: 10,
    marginBottom: 24,
  },
};

const customVariables: ThemeOptions = {
  overrides,
  palette,
  shape: {
    borderRadius: 5,
  },
  typography,
};

export default customVariables;
