import { Module, ModuleType } from '../../Module';

import { seed } from './lib/seed';

const Kernel: Module = {
  name: 'Kernel',
  seed,
  topologies: [],
  type: ModuleType.Library,
  views: [],
};

export default Kernel;
