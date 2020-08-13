export default (theme) => ({
  MuiButton: {
    root: {
      '& .MuiSvgIcon-root': {
        fontSize: '1.375rem',
      },
      '&.active .MuiButton-label:after': {
        backgroundColor: theme.palette.primary.contrastText,
        bottom: 0,
        content: '""',
        height: '.3em',
        left: 0,
        position: 'absolute',
        right: 0,
      },
      textTransform: null,
    },
    sizeLarge: {
      fontSize: '1rem',
    },
  },
  MuiFormControlLabel: {
    label: {
      fontSize: '1em',
    },
  },
  MuiIconButton: {
    root: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      minHeight: '2em',
      minWidth: '2em',
    },
    sizeSmall: {
      fontSize: '1em',
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
