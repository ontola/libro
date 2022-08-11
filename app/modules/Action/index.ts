import { Module, ModuleType } from '../../Module';

import { seed } from './lib/seed';
import topologies from './topologies';
import views from './views';

const Action: Module = {
  name: 'Action',
  seed,
  topologies,
  type: ModuleType.Library,
  views,
};

export default Action;
