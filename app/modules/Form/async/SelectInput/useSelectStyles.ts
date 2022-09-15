import { makeStyles } from '@mui/styles';

import { SHADOW_LIGHT } from '../../../Common/lib/flow';
import { fieldVariantPreviewCID } from '../../components/FormField/UseFormStyles';

const useSelectStyles = makeStyles(() => ({
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
