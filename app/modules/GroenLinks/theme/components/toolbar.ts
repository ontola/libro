import { MaterialStyleMap } from '../../../Common/theme/types';

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
