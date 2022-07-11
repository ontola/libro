import { Module, ModuleType } from '../../Module';

import views from './views';

const Libro: Module = {
  name: 'Libro',
  topologies: [],
  type: ModuleType.Library,
  views,
};

export default Libro;
