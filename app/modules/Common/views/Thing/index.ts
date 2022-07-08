import { ViewRegistrations } from '../../../../Module';

import properties from './properties';
import ThingAlertDialog from './ThingAlertDialog';
import ThingCard from './ThingCard';
import ThingContainer from './ThingContainer';
import ThingDetailsBar from './ThingDetailsBar';
import ThingFooter from './ThingFooter';
import ThingFullResource from './ThingFull';
import ThingGrid from './ThingGrid';
import ThingInline from './ThingInline';
import ThingMainBody from './ThingMainBody';
import ThingMenu from './ThingMenu';
import ThingPage from './ThingPage';
import ThingPageHeader from './ThingPageHeader';
import ThingParent from './ThingParent';
import ThingSection from './ThingSection';
import ThingTabPane from './ThingTabPane';

const views: ViewRegistrations = [
  ...properties,
  ...ThingAlertDialog,
  ...ThingCard,
  ...ThingContainer,
  ...ThingDetailsBar,
  ...ThingFooter,
  ...ThingFullResource,
  ...ThingGrid,
  ...ThingMainBody,
  ...ThingMenu,
  ...ThingPage,
  ...ThingPageHeader,
  ...ThingTabPane,
  ...ThingParent,
  ...ThingInline,
  ...ThingSection,
];

export default views;
