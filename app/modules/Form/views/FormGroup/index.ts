import { ViewRegistrations } from '../../../../Module';

import CollapsibleGroup from './CollapsibleGroup';
import FooterGroup from './FooterGroup';
import FormGroup from './FormGroup';

const views: ViewRegistrations = [
  ...CollapsibleGroup,
  ...FooterGroup,
  ...FormGroup,
];

export default views;
