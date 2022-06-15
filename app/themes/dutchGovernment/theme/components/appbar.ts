import appbar from '../../../common/theme/components/appbar';
import { LibroTheme, MaterialStyleMap } from '../../../themes';

export default (theme: LibroTheme): MaterialStyleMap => {
  const customAppBar = appbar(theme);
  customAppBar.MuiAppBar.styleOverrides.root = {
    ...customAppBar.MuiAppBar.styleOverrides.root,
    '& .MuiButton-root': {
      borderRadius: 0,
      height: '100%',
      whiteSpace: 'nowrap',
    },
    '& .MuiButton-root.active .MuiButton-label:after': {
      '&::after': {
        content: 'none',
      },
    },
    '& .MuiButton-root:hover': {
      background: 'hsla(0, 0%, 100%, .85)',
      color: theme.palette.common.black,
      textDecoration: 'underline',
    },
  };

  return customAppBar;
};
