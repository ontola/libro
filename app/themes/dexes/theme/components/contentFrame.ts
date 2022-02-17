import { MaterialStyleMap } from '../../../themes';

import Wave from './Wave';

const contentFrame = (): MaterialStyleMap => ({
  ContentFrame: {
    appContainer: {
      '&:before': {
        backgroundImage: `url(${Wave})`,
        backgroundRepeat: 'repeat-x',
        content: '""',
        height: '100vh',
        left: '0px',
        opacity: '0.2',
        position: 'absolute',
        top: '0px',
        width: '100vw',
      },
    },
  },
});

export default contentFrame;
