import { MaterialStyleMap } from '../../../themes';

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
