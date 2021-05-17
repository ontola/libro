import { LibroTheme, MaterialStyleMap } from '../../../themes';

export default (theme: LibroTheme): MaterialStyleMap => ({
  MuiListItem: {
    root: {
      lineHeight: undefined,
      minHeight: undefined,
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
      lineHeight: undefined,
      minHeight: undefined,
      whiteSpace: undefined,
    },
  },
});
