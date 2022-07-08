import { Module, ModuleType } from '../../Module';

import topologies from './topologies';
import views from './views';

const Table: Module = {
  name: 'Table',
  topologies,
  type: ModuleType.Library,
  views,
};

export default Table;
