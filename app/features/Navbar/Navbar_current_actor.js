import GuestUserActor from '../../views/GuestUserActor/index';
import ImageObject from '../../views/ImageObject/index';
import PersonSidebar from '../../views/Person/sidebar';
import UserActor from '../../views/UserActor/index';

export default [
  GuestUserActor,
  ...ImageObject,
  ...PersonSidebar,
  UserActor,
];
