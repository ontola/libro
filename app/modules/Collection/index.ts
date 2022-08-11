import { Module, ModuleType } from '../../Module';

import { seed } from './lib/seed';
import views from './views';

const Collection: Module = {
  name: 'Collection',
  seed,
  topologies: [],
  type: ModuleType.Library,
  views,
};

export default Collection;
