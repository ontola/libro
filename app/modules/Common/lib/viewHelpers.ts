import ontola from '../../Kernel/ontology/ontola';

import { properties } from './properties';

export const defaultMenus = properties()(
  ontola.followMenu,
  ontola.shareMenu,
  ontola.actionsMenu,
);
