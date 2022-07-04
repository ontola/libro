import { MaterialStyleMap } from '../types';

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
