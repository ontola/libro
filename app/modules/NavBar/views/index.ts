import { ViewRegistrations } from '../../../Module';

import ErrorNavbar from './ErrorNavbar';
import LoadingNavbar from './LoadingNavbar';
import MenuItem from './MenuItem';
import MenuNavbar from './MenuNavbar';

const views: ViewRegistrations = [
  ...ErrorNavbar,
  ...LoadingNavbar,
  ...MenuItem,
  ...MenuNavbar,
];

export default views;
