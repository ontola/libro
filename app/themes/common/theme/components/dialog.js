export default (theme) => ({
  MuiDialog: {
    paper: {
      [theme.breakpoints.down('400')]: {
        minWidth: '100%',
      },
      minWidth: '400px',
    },
  },
});
