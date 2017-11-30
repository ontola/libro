import LinkedRenderStore from 'link-lib';

import { NS } from '../../../helpers/LinkedRenderStore';
import { menuItems } from '../../NavigationsMenu/properties/menuItems';

export default LinkedRenderStore.registerRenderer(
  menuItems,
  NS.argu('OrganizationsMenu'),
  NS.argu('menuItems'),
  [undefined, NS.argu('sidebarBlock')]
);
