import { ViewRegistrations } from '../../../Module';

import Condition from './Condition';
import ErrorResponse from './ErrorResponse';
import FilterOption from './FilterOption';
import Form from './Form';
import FormField from './FormField';
import FormGroup from './FormGroup';
import FormOption from './FormOption';
import FormPage from './FormPage';
import Loading from './Loading';
import Thing from './Thing';

const views: ViewRegistrations = [
  ...Condition,
  ...ErrorResponse,
  ...FilterOption,
  ...Form,
  ...FormField,
  ...FormGroup,
  ...FormOption,
  ...FormPage,
  ...Thing,
  ...Loading,
];

export default views;
