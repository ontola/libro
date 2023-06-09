import { ViewRegistrations } from '../../../../Module';

import EntryPoint from './EntryPoint';
import EntryPointButton from './EntryPointButton';
import EntryPointCardFloat from './EntryPointCardFloat';
import EntryPointCardMain from './EntryPointCardMain';
import EntryPointContainer from './EntryPointContainer';
import EntryPointDetail from './EntryPointDetail';
import EntryPointWidget from './EntryPointGrid';
import EntryPointMainBody from './EntryPointMainBody';
import EntryPointOmniform from './EntryPointOmniform';

const views: ViewRegistrations = [
  ...EntryPointButton,
  ...EntryPointCardFloat,
  ...EntryPointCardMain,
  ...EntryPointContainer,
  ...EntryPointDetail,
  ...EntryPointMainBody,
  ...EntryPointOmniform,
  ...EntryPointWidget,
  ...EntryPoint,
];

export default views;
