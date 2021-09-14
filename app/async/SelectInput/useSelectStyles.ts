import { makeStyles } from '@material-ui/styles';

import { SHADOW_LIGHT } from '../../helpers/flow';
import { LibroTheme } from '../../themes/themes';

const useSelectStyles = makeStyles((theme: LibroTheme) => ({
  flow: {
    boxShadow: SHADOW_LIGHT,
  },
  input: {
    flexWrap: 'nowrap',
  },
  inputBaseFlow: {
    height: '3rem',
  },
  popper: {
    width: 'fit-content !important',
    zIndex: theme.zIndex.drawer + 1,
  },
  wrapper: {
    '& input': {
      cursor: 'pointer',
    },
    '.Field--variant-preview &:hover': {
      boxShadow: 'unset',
      filter: 'brightness(.96)',
    },
    cursor: 'pointer',
  },
}));

export default useSelectStyles;
