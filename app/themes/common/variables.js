import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  background: {
    default: '#eef0f2',
    paper: '#ffffff',
  },
  primary: {
    contrastText: '#ffffff',
    main: '#475668',
  },
  secondary: {
    contrastText: '#ffffff',
    main: '#475668',
  },
  typography: {
    fontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontSize: '15',
  },
});

export default {
  theme,
};
