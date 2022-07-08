import { Module, ModuleType } from '../../Module';

import topologies from './topologies';
import views from './views';

const Form: Module = {
  name: 'Form',
  topologies,
  type: ModuleType.Library,
  views,
};

export default Form;
