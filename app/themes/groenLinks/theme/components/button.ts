import deepmerge from 'deepmerge';

import button from '../../../common/theme/components/button';
import { MaterialStyleMap } from '../../../themes';

export default (): MaterialStyleMap => (
  deepmerge(button(), {
    MuiButton: {
      label: {
        fontFamily: 'Suisse Webfont',
        fontWeight: 900,
        textTransform: 'uppercase',
      },
    },
  })
);
