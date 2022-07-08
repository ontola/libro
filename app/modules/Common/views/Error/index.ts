import ErrorNavbar from '../../../NavBar/views/ErrorNavbar';

import ErrorButtonInline from './ErrorButtonInline';
import ErrorCardReg from './ErrorContainer';
import ErrorPrimaryResource from './ErrorFull';
import ErrorGrid from './ErrorGrid';

export default [
  ...ErrorPrimaryResource,
  ...ErrorCardReg,
  ...ErrorGrid,
  ...ErrorNavbar,
  ...ErrorButtonInline,
];
