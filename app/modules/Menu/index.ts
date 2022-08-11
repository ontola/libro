import { Module, ModuleType } from '../../Module';

import { seed } from './lib/seed';
import topologies from './topologies';
import views from './views';

const Menu: Module = {
  name: 'Menu',
  seed,
  topologies,
  type: ModuleType.Library,
  views,
};

export default Menu;
