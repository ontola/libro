import { loadingParagraphCID } from '../../../../components/Loading';
import { appMenuCID } from '../../../../topologies/AppMenu';
import { LibroTheme, MaterialStyleMap } from '../../../themes';

export default (theme: LibroTheme): MaterialStyleMap => ({
  MuiListItem: {
    styleOverrides: {
      root: {
        lineHeight: undefined,
        minHeight: undefined,
      },
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: '30px',
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        [theme.breakpoints.down('md')]: {
          [`&.${appMenuCID}`]: {
            maxWidth: '100%',
            width: '100%',
          },
        },
        [`& .${loadingParagraphCID}`]: {
          minWidth: '14em',
        },
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        [theme.breakpoints.up('md')]: {
          maxWidth: '14em',
        },
        lineHeight: undefined,
        minHeight: undefined,
        whiteSpace: undefined,
      },
    },
  },
});
