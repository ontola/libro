import * as currentActor from './Navbar_current_actor';
import * as organization from './Navbar_organization';

export { default as Component } from '../../components/NavBarContent';

export default [
  ...currentActor,
  ...organization,
];
