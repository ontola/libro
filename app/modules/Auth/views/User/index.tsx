import { ViewRegistrations } from '../../../../Module';

import CurrentActorFooter from './CurrentActorFooter';
import GuestUserNavbar from './GuestUserNavbar';
import GuestUserParent from './GuestUserParent';
import UserNavbar from './UserNavbar';

const views: ViewRegistrations = [
  ...UserNavbar,
  ...CurrentActorFooter,
  ...GuestUserNavbar,
  ...GuestUserParent,
];

export default views;
