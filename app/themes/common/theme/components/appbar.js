export default (theme) => ({
  MuiAppBar: {
    root: {
      '& .MuiButton-root': {
        height: '100%',
        whiteSpace: 'nowrap',
      },
      '& .MuiToolbar-root': {
        '& > .NavBarContent__items': {
          flexBasis: '100%',
        },
        '& > .NavBarContent__menus': {
          flexBasis: '100%',
        },
        '& img': {
          maxHeight: theme.appBar.height,
        },
        height: theme.appBar.height,
        minHeight: theme.appBar.height,
      },
      zIndex: 1299,
    },
  },
});
