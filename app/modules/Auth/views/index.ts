import { ViewRegistrations } from '../../../Module';

import AppSignOutActionsBar from './AppSignOut/AppSignOutActionsBar';
import Confirmation from './Confirmation';
import User from './User';

const views: ViewRegistrations = [
  ...AppSignOutActionsBar,
  ...Confirmation,
  ...User,
];

export default views;
