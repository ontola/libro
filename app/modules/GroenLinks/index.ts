import { Module, ModuleType } from '../../Module';

import { seed } from './lib/seed';
import views from './views';

const GroenLinks: Module = {
  name: 'GroenLinks',
  seed,
  topologies: [],
  type: ModuleType.App,
  views,
};

export default GroenLinks;
