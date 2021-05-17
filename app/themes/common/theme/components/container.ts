import { MaterialStyleMap } from '../../../themes';

export default (): MaterialStyleMap => ({
  MuiContainer: {
    root: {
      '.MuiGrid-root &': {
        padding: 0,
      },
      position: 'relative',
    },
  },
});
