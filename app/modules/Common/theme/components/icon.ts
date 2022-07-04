import { MaterialStyleMap } from '../../../Kernel/lib/themes';

export default (): MaterialStyleMap => ({
  MuiIcon: {
    styleOverrides: {
      root: {
        '& .fa': {
          display: 'block',
        },
      },
    },
  },
});
