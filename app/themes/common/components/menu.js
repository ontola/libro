export default ({ theme }) => ({
  MuiListItem: {
    root: {
      lineHeight: null,
      minHeight: null,
    },
  },
  MuiListItemIcon: {
    root: {
      minWidth: '30px',
    },
  },
  MuiMenu: {
    paper: {
      [theme.breakpoints.down('sm')]: {
        '&.AppMenu': {
          maxWidth: '100%',
          width: '100%',
        },
      },
      '& .Loading__Paragraph': {
        minWidth: '14em',
      },
    },
  },
  MuiMenuItem: {
    root: {
      [theme.breakpoints.up('md')]: {
        maxWidth: '14em',
      },
      lineHeight: null,
      minHeight: null,
      whiteSpace: null,
    },
  },
});
