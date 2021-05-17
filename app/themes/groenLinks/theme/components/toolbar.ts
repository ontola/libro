import { MaterialStyleMap } from '../../../themes';

export default (): MaterialStyleMap => ({
  MuiToolbar: {
    root: {
      '& > *': {
        flex: '1 1 0px',
        flexBasis: 0,
      },
    },
  },
});
