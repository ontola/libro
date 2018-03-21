import MenuItem from '../../views/MenuItem/index';
import MenuSection from '../../views/MenuSection/index';
import NavigationsMenu from '../../views/NavigationsMenu/index';
import Organization from '../../views/Organization/index';
import Image from '../../views/Thing/properties/image';

export default [
  Image,
  ...MenuItem,
  ...MenuSection,
  ...NavigationsMenu,
  ...Organization,
];
