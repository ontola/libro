import { Module, ModuleType } from '../../Module';

import topologies from './topologies';
import views from './views';

const NavBar: Module = {
  name: 'NavBar',
  seed: [],
  topologies,
  type: ModuleType.Library,
  views,
};

export default NavBar;
