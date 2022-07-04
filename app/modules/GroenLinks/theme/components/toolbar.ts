import { MaterialStyleMap } from '../../../Kernel/lib/themes';

export default (): MaterialStyleMap => ({
  MuiToolbar: {
    styleOverrides: {
      root: {
        '& > *': {
          flex: '1 1 0px',
          flexBasis: 0,
        },
      },
    },
  },
});
