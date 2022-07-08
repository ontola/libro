import { ViewRegistrations } from '../../../../Module';
import MenuItemHeader from '../../../NavBar/views/MenuItem/MenuItemNavbar';

import MenuItemCardAppendix from './MenuItemCardAppendix';
import MenuItemCardRow from './MenuItemCardRow';
import MenuItemDropdown from './MenuItemDropdown';
import MenuItemDropdownContent from './MenuItemDropdownContent';
import MenuItemFooter from './MenuItemFooter';
import MenuItemFull from './MenuItemFull';
import MenuItemNested from './MenuItemNested';
import MenuItemPage from './MenuItemPage';
import MenuItemTab from './MenuItemTab';
import MenuItemTableCell from './MenuItemTableCell';
import CurrentTab from './properties/currentTab';
import Href from './properties/href';
import IsPartOfMain from './properties/isPartOfMain';
import LabelCard from './properties/labelCard';
import LabelFooter from './properties/labelFooter';
import LabelHeader from './properties/labelHeader';
import LabelTableRow from './properties/labelTableRow';
import MenuItemsComp from './properties/menuItems';
import MenuTabs from './properties/menuTabs';
import Text from './properties/text';

const views: ViewRegistrations = [
  ...CurrentTab,
  ...IsPartOfMain,
  ...Href,
  ...LabelCard,
  ...LabelFooter,
  ...LabelHeader,
  ...LabelTableRow,
  ...MenuItemCardAppendix,
  ...MenuItemCardRow,
  ...MenuItemDropdown,
  ...MenuItemFull,
  ...MenuItemPage,
  ...MenuItemHeader,
  ...MenuItemFooter,
  ...MenuItemNested,
  ...MenuItemTab,
  ...MenuItemDropdownContent,
  ...MenuItemsComp,
  ...MenuItemTableCell,
  ...MenuTabs,
  ...Text,
];

export default views;
