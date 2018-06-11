import SidebarCollections from '../../views/Collection/sidebar';
import Sequence from '../../views/Seq/index';
import Menu from '../Menu/Menu';

import currentActor from './Navbar_current_actor';
import organization from './Navbar_organization';

export { default as Component } from '../../components/NavBarContent';

export default [
  ...currentActor,
  ...Menu,
  ...organization,
  ...SidebarCollections,
  Sequence,
];
