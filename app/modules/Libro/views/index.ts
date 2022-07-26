import { ViewRegistrations } from '../../../Module';

import Browser from './Browser/Browser';
import ModulesList from './ModulesList/ModulesList';
import TopologiesList from './TopologiesList/TopologiesList';

const views: ViewRegistrations = [
  ...Browser,
  ...ModulesList,
  ...TopologiesList,
];

export default views;
