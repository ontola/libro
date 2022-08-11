import { Module, ModuleType } from '../../Module';

import { seed } from './lib/seed';
import views from './views';

const Argu: Module = {
  name: 'Argu',
  seed,
  topologies: [],
  type: ModuleType.App,
  views,
};

export default Argu;
