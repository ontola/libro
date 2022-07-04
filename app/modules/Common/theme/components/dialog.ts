import { LibroTheme, MaterialStyleMap } from '../../../Kernel/lib/themes';

const DIALOG_BREAKPOINT = 400;

export default (theme: LibroTheme): MaterialStyleMap => ({
  MuiDialog: {
    styleOverrides: {
      paper: {
        [theme.breakpoints.down(DIALOG_BREAKPOINT)]: {
          minWidth: '100%',
        },
        minWidth: `${DIALOG_BREAKPOINT}px`,
      },
    },
  },
});
