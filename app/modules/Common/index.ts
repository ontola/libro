import { Module, ModuleType } from '../../Module';

import { seed } from './lib/hardSeed';
import { initialize } from './lib/initialize';
import topologies from './topologies';
import views from './views';

const Common: Module = {
  initialize,
  name: 'Common',
  seed,
  topologies,
  type: ModuleType.Library,
  views,
};

export default Common;
