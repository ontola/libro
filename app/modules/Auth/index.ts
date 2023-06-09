import { Module, ModuleType } from '../../Module';

import { seed } from './lib/seed';
import views from './views';

const Auth: Module = {
  name: 'Auth',
  seed,
  topologies: [],
  type: ModuleType.Library,
  views,
};

export default Auth;
