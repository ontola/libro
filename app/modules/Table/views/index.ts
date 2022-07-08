import { ViewRegistrations } from '../../../Module';

import Loading from './Loading';
import Thing from './Thing';

const views: ViewRegistrations = [
  ...Loading,
  ...Thing,
];

export default views;
