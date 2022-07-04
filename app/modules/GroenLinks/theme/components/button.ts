import deepmerge from 'deepmerge';

import button from '../../../Common/theme/components/button';
import { MaterialStyleMap } from '../../../Common/theme/types';

export default (): MaterialStyleMap => (
  deepmerge(button(), {
    MuiButton: {
      styleOverrides: {
        label: {
          fontFamily: 'Suisse Webfont',
          fontWeight: 900,
          textTransform: 'uppercase',
        },
      },
    },
  })
);
