export default () => ({
  MuiButton: {
    root: {
      '& .MuiSvgIcon-root': {
        fontSize: '1.375rem',
      },
      textTransform: null,
    },
    sizeLarge: {
      fontSize: '1rem',
      minHeight: '3.2rem',
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
});
