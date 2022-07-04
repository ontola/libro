import { LibroTheme, MaterialStyleMap } from '../../../Kernel/lib/themes';

export default (theme: LibroTheme): MaterialStyleMap => ({
  MuiAppBar: {
    styleOverrides: {
      root: {
        '& .MuiButton-root': {
          height: '100%',
          whiteSpace: 'nowrap',
        },
        '& .MuiToolbar-root': {
          '& img': {
            maxHeight: theme.appBar.height,
          },
          height: theme.appBar.height,
          minHeight: theme.appBar.height,
        },
      },
    },
  },
});
