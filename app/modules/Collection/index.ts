import { Module, ModuleType } from '../../Module';

import views from './views';

const Collection: Module = {
  name: 'Collection',
  topologies: [],
  type: ModuleType.Library,
  views,
};

export default Collection;
