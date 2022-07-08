import { Module, ModuleType } from '../../Module';

import views from './views';

const DataCube: Module = {
  name: 'DataCube',
  topologies: [],
  type: ModuleType.Library,
  views,
};

export default DataCube;
