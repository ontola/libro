import deepmerge from 'deepmerge';

import appbar from '../../../common/theme/components/appbar';
import { LibroTheme, MaterialStyleMap } from '../../../themes';

export default (theme: LibroTheme): MaterialStyleMap => (
  deepmerge(appbar(theme), {
    MuiAppBar: {
      root: {
        '& .MuiToolbar-root': {
          '& > .NavBarContent__items': {
            flexBasis: '100%',
          },
          '& > .NavBarContent__menus': {
            flexBasis: '100%',
          },
        },
      },
    },
  })
);
