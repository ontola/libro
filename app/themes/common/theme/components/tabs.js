export default (theme) => ({
  MuiTab: {
    labelIcon: {
      '& $wrapper :first-child': {
        fontSize: 14,
        marginBottom: 0,
        marginRight: 6,
      },
      minHeight: null,
      paddingTop: null,
    },
    root: {
      textTransform: null,
      [theme.breakpoints.up('sm')]: {
        minWidth: null,
      },
    },
    wrapper: {
      flexDirection: 'row',
    },
  },
  MuiTabs: {
    scrollButtons: {
      width: 'auto',
    },
  },
});
