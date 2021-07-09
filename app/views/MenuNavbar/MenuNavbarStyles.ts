import { makeStyles } from '@material-ui/styles';

import { hoverHighlight } from '../../themes/stylelets';
import { LibroTheme } from '../../themes/themes';

export default makeStyles<LibroTheme>((theme) => ({
  button: {
    ...hoverHighlight(theme),
    borderRadius: '0',
    minWidth: 'auto',
    padding: '.5rem 1rem',
  },
  root: {
    backgroundColor: theme.palette.grey.xxLight,
  },
}));
