import { makeStyles } from '@material-ui/styles';

import { LibroTheme } from '../../themes/themes';

export default makeStyles((theme: LibroTheme) => ({
  bold: {
    color: theme.palette.grey.midDark,
    fontWeight: 'bold',
  },
  default: {
    'a:hover &': {
      color: theme.palette.grey.midDark,
    },
    color: theme.palette.grey.xxLightForegroundSmall,
  },
  error: {
    color: theme.palette.error.main,
  },
  success: {
    color: theme.palette.success.main,
  },
  warning: {
    color: theme.palette.warning.main,
  },
  wrapper: {
    alignSelf: 'center',
    fontSize: '.85em',
    lineHeight: '1.3rem',
    minHeight: '1.3rem',
    whiteSpace: 'nowrap',
  },
}));

