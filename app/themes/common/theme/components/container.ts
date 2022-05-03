import { MaterialStyleMap } from '../../../themes';

export default (): MaterialStyleMap => ({
  MuiContainer: {
    styleOverrides: {
      root: {
        '.MuiGrid-root &': {
          padding: 0,
        },
        position: 'relative',
      },
    },
  },
});
