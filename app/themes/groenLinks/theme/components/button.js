import deepmerge from 'deepmerge';

import button from '../../../common/theme/components/button';

export default () => (
  deepmerge(button, {
    MuiButton: {
      label: {
        fontFamily: 'Suisse Webfont',
        fontWeight: 900,
        textTransform: 'uppercase',
      },
    },
  })
);
