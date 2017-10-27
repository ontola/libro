import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';
import menuItems from '../../NavigationsMenu/properties/menuItems';

[undefined, NS.argu('sidebarBlock')].forEach((top) => {
  LinkedRenderStore.registerRenderer(
    menuItems,
    NS.argu('OrganizationsMenu'),
    NS.argu('menuItems'),
    top
  );
});
