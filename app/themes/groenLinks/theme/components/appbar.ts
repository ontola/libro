import deepmerge from 'deepmerge';

import { navBarContentMenusCID } from '../../../../modules/NavBar/components/NavBarContent';
import { navBarContentItemsCID } from '../../../../modules/NavBar/components/NavBarContent/NavbarNavigationsMenu';
import appbar from '../../../common/theme/components/appbar';
import { LibroTheme, MaterialStyleMap } from '../../../themes';

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
