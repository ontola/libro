import { makeStyles } from '@mui/styles';

import { LibroTheme } from '../../themes/themes';

export default makeStyles((theme: LibroTheme) => ({
  bold: {
    fontWeight: 600,
  },
  centered: {
    alignItems: 'center',
  },
  subtle: {
    color: theme.palette.link.text,
  },
}));
