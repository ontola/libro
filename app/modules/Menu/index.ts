import { Module, ModuleType } from '../../Module';

import topologies from './topologies';
import views from './views';

const Menu: Module = {
  name: 'Menu',
  topologies,
  type: ModuleType.Library,
  views,
};

export default Menu;
