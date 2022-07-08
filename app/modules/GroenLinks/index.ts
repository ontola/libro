import { Module, ModuleType } from '../../Module';

import views from './views';

const GroenLinks: Module = {
  name: 'GroenLinks',
  topologies: [],
  type: ModuleType.App,
  views,
};

export default GroenLinks;
