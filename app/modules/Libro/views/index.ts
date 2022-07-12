import { ViewRegistrations } from '../../../Module';

import ModulesList from './ModulesList/ModulesList';
import TopologiesList from './TopologiesList/TopologiesList';

const views: ViewRegistrations = [
  ...ModulesList,
  ...TopologiesList,
];

export default views;
