import { ViewRegistrations } from '../../../Module';

import Agreement from './Agreement';
import Dataset from './Dataset';
import Distribution from './Distribution';
import Folder from './Folder';
import Invite from './Invite';
import Offer from './Offer';
import Properties from './properties';

const views: ViewRegistrations = [
  ...Agreement,
  ...Dataset,
  ...Distribution,
  ...Properties,
  ...Folder,
  ...Invite,
  ...Offer,
];

export default views;
