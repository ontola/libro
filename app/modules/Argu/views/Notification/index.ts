import { ViewRegistrations } from '../../../../Module';

import Notification from './Notification';
import NotificationFull from './NotificationFull';
import NotificationHeader from './NotificationHeader';
import Creator from './properties/creator';
import Name from './properties/name';
import Target from './properties/target';
import Unread from './properties/unread';

const views: ViewRegistrations = [
  ...Notification,
  ...NotificationFull,
  ...NotificationHeader,
  ...Creator,
  ...Name,
  ...Target,
  ...Unread,
];

export default views;
