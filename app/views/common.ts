import { properties } from '../helpers/builder';
import ontola from '../ontology/ontola';

export const defaultMenus = properties()(
  ontola.followMenu,
  ontola.shareMenu,
  ontola.actionsMenu,
);
