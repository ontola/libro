import contains from '../../views/Thing/properties/contains';

import * as currentActor from './Navbar_current_actor';
import * as organization from './Navbar_organization';

export { default as Component } from '../../components/NavBarContent';

export default [
  contains,
  ...currentActor,
  ...organization,
];
