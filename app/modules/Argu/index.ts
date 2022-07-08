import { Module, ModuleType } from '../../Module';

import views from './views';

const Argu: Module = {
  name: 'Argu',
  topologies: [],
  type: ModuleType.App,
  views,
};

export default Argu;
