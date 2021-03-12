import deepmerge from 'deepmerge';

import button from '../../../common/theme/components/button';

export default (theme) => (
  deepmerge(button(theme), {
    MuiButton: {
      label: {
        fontFamily: 'Suisse Webfont',
        fontWeight: 900,
        textTransform: 'uppercase',
      },
    },
  })
);
