import { makeStyles } from '@mui/styles';

import { LibroTheme } from '../../../../themes/themes';

export default makeStyles((theme: LibroTheme) => ({
  defaultMargin: {
    marginRight: '.75rem',
  },
  floatRight: {
    marginLeft: 'auto',
  },
  image: {
    alignItems: 'center',
    borderRadius: '100%',
    color: theme.palette.grey.midDark,
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    marginRight: '.3rem',
    maxHeight: '1.3rem',
    maxWidth: '1.3rem',
  },
  smallMargin: {
    marginRight: '.2em',
  },
  wrapper: {
    alignItems: 'center',
    display: 'inline-flex',
  },
}));
