import { Module, ModuleType } from '../../Module';

import { seed } from './lib/seed';
import views from './views';

const Elements: Module = {
  name: 'Elements',
  seed,
  topologies: [],
  type: ModuleType.Library,
  views,
};

export default Elements;
