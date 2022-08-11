import { Module, ModuleType } from '../../Module';

import { seed } from './lib/seed';
import topologies from './topologies';
import views from './views';

const Form: Module = {
  name: 'Form',
  seed,
  topologies,
  type: ModuleType.Library,
  views,
};

export default Form;
