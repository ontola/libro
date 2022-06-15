import { loadingParagraphCID } from '../../../../modules/Core/components/Loading';
import { appMenuCID } from '../../../../topologies/AppMenu';
import {
  BreakPoints,
  LibroTheme,
  MaterialStyleMap, 
} from '../../../themes';

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
        [theme.breakpoints.down(BreakPoints.Medium)]: {
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
        [theme.breakpoints.up(BreakPoints.Medium)]: {
          maxWidth: '14em',
        },
        lineHeight: undefined,
        minHeight: undefined,
        whiteSpace: undefined,
      },
    },
  },
});
