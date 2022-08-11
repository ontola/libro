import { Module, ModuleType } from '../../Module';

import topologies from './topologies';
import views from './views';

const SalesWebsite: Module = {
  name: 'SalesWebsite',
  seed: [],
  topologies,
  type: ModuleType.App,
  views,
};

export default SalesWebsite;
