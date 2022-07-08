import { ViewRegistrations } from '../../../Module';

import ErrorMenu from './ErrorMenu';
import Loading from './Loading';
import MenuItem from './MenuItem';

const views: ViewRegistrations = [
  ...ErrorMenu,
  ...MenuItem,
  ...Loading,
];

export default views;
