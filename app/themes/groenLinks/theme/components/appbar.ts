import deepmerge from 'deepmerge';

import { navBarContentMenusCID } from '../../../../components/NavBarContent';
import { navBarContentItemsCID } from '../../../../components/NavBarContent/NavbarNavigationsMenu';
import appbar from '../../../common/theme/components/appbar';
import { LibroTheme, MaterialStyleMap } from '../../../themes';

export default (theme: LibroTheme): MaterialStyleMap => (
  deepmerge(appbar(theme), {
    MuiAppBar: {
      root: {
        '& .MuiToolbar-root': {
          [`& > .${navBarContentItemsCID}`]: {
            flexBasis: '100%',
          },
          [`& > .${navBarContentMenusCID}`]: {
            flexBasis: '100%',
          },
        },
      },
    },
  })
);
