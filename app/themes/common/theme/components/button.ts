import { MaterialStyleMap } from '../../../themes';

export default (): MaterialStyleMap => ({
  MuiButton: {
    root: {
      textTransform: undefined,
    },
  },
  MuiFormControlLabel: {
    label: {
      fontSize: '1em',
    },
  },
  MuiIconButton: {
    root: {
      '& .fa': {
        lineHeight: '1.5rem',
        minHeight: '1.5rem',
        minWidth: '1.5rem',
      },
    },
  },
  MuiRadio: {
    root: {
      minHeight: '1em',
      minWidth: '1em',
      padding: '0 9px',
    },
  },
  MuiSvgIcon: {
    fontSizeSmall: {
      fontSize: '1rem',
    },
  },
});
