import { LibroTheme, MaterialStyleMap } from '../../../themes';

export default (theme: LibroTheme): MaterialStyleMap => ({
  MuiTab: {
    styleOverrides: {
      labelIcon: {
        '& $wrapper :first-child': {
          fontSize: 14,
          marginBottom: 0,
          marginRight: 6,
        },
        minHeight: undefined,
        paddingTop: undefined,
      },
      root: {
        textTransform: 'none',
        [theme.breakpoints.up('sm')]: {
          minWidth: null,
        },
      },
      wrapper: {
        flexDirection: 'row',
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      scrollButtons: {
        width: 'auto',
      },
    },
  },
});
