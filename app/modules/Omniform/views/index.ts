import { ViewRegistrations } from '../../../Module';

import Error from './Error';
import Loading from './Loading';
import OmniformProp from './OmniformProp';

const views: ViewRegistrations = [
  ...Error,
  ...Loading,
  ...OmniformProp,
];

export default views;
