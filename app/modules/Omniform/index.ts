import { Module, ModuleType } from '../../Module';

import topologies from './topologies';
import views from './views';

const Omniform: Module = {
  name: 'Omniform',
  seed: [],
  topologies,
  type: ModuleType.Library,
  views,
};

export default Omniform;
