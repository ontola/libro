import { Module, ModuleType } from '../../Module';

import topologies from './topologies';
import views from './views';

const Common: Module = {
  name: 'Common',
  topologies,
  type: ModuleType.Library,
  views,
};

export default Common;
