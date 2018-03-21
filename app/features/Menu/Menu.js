/**
 * Resources needed to render different kinds of menus.
 * @module features/Menu
 */

import Image from '../../views/Thing/properties/image';
import MenuItem from '../../views/MenuItem/index';
import MenuSection from '../../views/MenuSection/index';

export default [
  Image,
  ...MenuItem,
  ...MenuSection,
];
