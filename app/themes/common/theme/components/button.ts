import { MaterialStyleMap } from '../../../themes';

export default (): MaterialStyleMap => ({
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
      },
    },
  },
  MuiFormControlLabel: {
    styleOverrides: {
      label: {
        fontSize: '1em',
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        '& .fa': {
          lineHeight: '1.5rem',
          minHeight: '1.5rem',
          minWidth: '1.5rem',
        },
      },
    },
  },
  MuiRadio: {
    styleOverrides: {
      root: {
        minHeight: '1em',
        minWidth: '1em',
        padding: '0 9px',
      },
    },
  },
  MuiSvgIcon: {
    styleOverrides: {
      fontSizeSmall: {
        fontSize: '1rem',
      },
    },
  },
});
