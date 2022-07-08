import { Module, ModuleType } from '../../Module';

import topologies from './topologies';
import views from './views';

const Flow: Module = {
  name: 'Flow',
  topologies,
  type: ModuleType.Library,
  views,
};

export default Flow;
