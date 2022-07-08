import { Module, ModuleType } from '../../Module';

import views from './views';

const Auth: Module = {
  name: 'Auth',
  topologies: [],
  type: ModuleType.Library,
  views,
};

export default Auth;
