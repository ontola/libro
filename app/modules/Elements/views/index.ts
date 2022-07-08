import { ViewRegistrations } from '../../../Module';

import Button from './Button';
import Document from './Document';
import ImageElement from './ImageElement';
import Grid from './Layout/Grid';
import Row from './Layout/Row';
import Spacer from './Layout/Spacer';
import VideoElement from './VideoElement';

const views: ViewRegistrations = [
  ...Button,
  ...Document,
  ...Grid,
  ...ImageElement,
  ...Row,
  ...Spacer,
  ...VideoElement,
];

export default views;
