import { ViewRegistrations } from '../../../../Module';

import PersonDetail from './PersonDetail';
import PersonFooter from './PersonFooter';
import PersonFormFooter from './PersonFormFooter';
import PersonFull from './PersonFull';
import PersonNavbar from './PersonNavbar';
import PersonSection from './PersonSection';
import PersonSelect from './PersonSelect';
import PersonShowcase from './PersonShowcase';
import Image from './properties/image';
import UnreadCount from './properties/unreadCount';

const views: ViewRegistrations = [
  ...PersonDetail,
  ...PersonFooter,
  ...PersonFormFooter,
  ...PersonFull,
  ...PersonNavbar,
  ...PersonSection,
  ...PersonSelect,
  ...PersonShowcase,
  ...Image,
  ...UnreadCount,
];

export default views;
