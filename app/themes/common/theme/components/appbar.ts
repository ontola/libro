import { LibroTheme, MaterialStyleMap } from '../../../themes';

export default (theme: LibroTheme): MaterialStyleMap => ({
  MuiAppBar: {
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
});
