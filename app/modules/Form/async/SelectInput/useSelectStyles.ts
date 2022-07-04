import { makeStyles } from '@mui/styles';

import { LibroTheme } from '../../../Kernel/lib/themes';
import { SHADOW_LIGHT } from '../../../Common/lib/flow';
import { fieldVariantPreviewCID } from '../../components/FormField/UseFormStyles';

const useSelectStyles = makeStyles((theme: LibroTheme) => ({
  flow: {
    boxShadow: SHADOW_LIGHT,
  },
  input: {
    '& .MuiAutocomplete-endAdornment': {
      position: 'absolute',
    },
    '&& div': {
      flexWrap: 'nowrap',
    },
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
    [`.${fieldVariantPreviewCID} &:hover`]: {
      boxShadow: 'unset',
      filter: 'brightness(.96)',
    },
    cursor: 'pointer',
  },
}));

export default useSelectStyles;
