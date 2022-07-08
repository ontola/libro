import { Module, ModuleType } from '../../Module';

import views from './views';

const Elements: Module = {
  name: 'Elements',
  topologies: [],
  type: ModuleType.Library,
  views,
};

export default Elements;
