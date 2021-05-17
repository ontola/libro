import { LibroTheme, MaterialStyleMap } from '../../../themes';

export default (theme: LibroTheme): MaterialStyleMap => ({
  MuiTab: {
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
      textTransform: undefined,
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
