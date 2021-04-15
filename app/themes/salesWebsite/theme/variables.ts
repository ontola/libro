import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

const customVariables: ThemeOptions = {
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
      color: '000',
      fontSize: '1.125rem',
      margin: 10,
      marginBottom: 14,
    },
    body2: {
      color: '000',
      fontSize: '1.125rem',
      margin: 10,
      marginBottom: 14,
    },
    fontFamily: 'Open Sans',
    h1: {
      // Fontsize desktop: 50, mobile: 30
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
      color: '000',
      fontSize: '3.125rem',
      fontWeight: 'bold',
      margin: 10,
      marginBottom: 24,
    },
    h2: {
      // Fontsize desktop: 37, mobile: 27
      '@media (max-width:600px)': {
        fontSize: '1.69rem',
      },
      color: '000',
      fontSize: '2.31rem',
      fontWeight: 'bold',
      margin: 10,
      marginBottom: 24,
    },
    h3: {
      // Fontsize desktop: 24, mobile: 20
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
      color: '000',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      margin: 10,
    },
    subtitle1: {
      color: '000',
      fontSize: '1.125rem',
      lineHeight: '1.7rem',
      margin: 10,
      marginBottom: 24,
    },
  },
};

export default customVariables;
