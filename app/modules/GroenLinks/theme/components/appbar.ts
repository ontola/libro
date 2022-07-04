import deepmerge from 'deepmerge';

import { navBarContentMenusCID } from '../../../NavBar/components/NavBarContent';
import { navBarContentItemsCID } from '../../../NavBar/components/NavBarContent/NavbarNavigationsMenu';
import appbar from '../../../Common/theme/components/appbar';
import { LibroTheme, MaterialStyleMap } from '../../../Kernel/lib/themes';

export default (theme: LibroTheme): MaterialStyleMap => (
  deepmerge(appbar(theme), {
    MuiAppBar: {
      styleOverrides: {
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
    },
  })
);
