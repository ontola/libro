import ontola from '../../Core/ontology/ontola';

import { properties } from './properties';

export const defaultMenus = properties()(
  ontola.followMenu,
  ontola.shareMenu,
  ontola.actionsMenu,
);
