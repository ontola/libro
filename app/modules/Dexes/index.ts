import { Module, ModuleType } from '../../Module';

import views from './views';

const Dexes: Module = {
  name: 'Dexes',
  seed: [],
  topologies: [],
  type: ModuleType.App,
  views,
};

export default Dexes;
