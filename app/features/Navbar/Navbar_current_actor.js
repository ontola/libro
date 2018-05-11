import ImageObject from '../../views/ImageObject/index';
import PersonSidebar from '../../views/Person/sidebar';
import User from '../../views/User/index';
import Email from '../../views/Person/properties/email';

export default [
  Email,
  ...ImageObject,
  ...PersonSidebar,
  ...User,
];
