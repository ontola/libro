import { Module, ModuleType } from '../../Module';

import topologies from './topologies';
import views from './views';

const Academy: Module = {
  name: 'Academy',
  topologies,
  type: ModuleType.App,
  views,
};

export default Academy;
