import { Module, ModuleType } from '../../Module';

import topologies from './topologies';
import views from './views';

const Action: Module = {
  name: 'Action',
  topologies,
  type: ModuleType.Library,
  views,
};

export default Action;
