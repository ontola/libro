import { ViewRegistrations } from '../../../Module';

import ActionBodyMain from './ActionBodyMain';
import ActionCardMain from './ActionCardMain';
import ActionCardRow from './ActionCardRow';
import ActionContainer from './ActionContainer';
import ActionContainerFloat from './ActionContainerFloat';
import ActionContainerHeader from './ActionContainerHeader';
import ActionDetail from './ActionDetail';
import ActionDropdownContent from './ActionDropdownContent';
import ActionFull from './ActionFull';
import ActionWidget from './ActionGrid';
import ActionInline from './ActionInline';
import ActionNested from './ActionNested';
import ActionTableCell from './ActionTableCell';
import CreateAction from './CreateAction';
import CreateSession from './CreateSession';
import EntryPoint from './EntryPoint';
import Error from './properties/error';
import Loading from './Loading';
import FollowUpName from './properties/followUpName';
import WidgetName from './properties/gridName';
import ReadAction from './ReadAction';

const views: ViewRegistrations = [
  ...CreateAction,
  ...CreateSession,
  ...ActionBodyMain,
  ...ActionCardMain,
  ...ActionCardRow,
  ...ActionContainer,
  ...ActionContainerFloat,
  ...ActionContainerHeader,
  ...ActionDetail,
  ...ActionDropdownContent,
  ...ActionInline,
  ...ActionNested,
  ...ActionFull,
  ...ActionTableCell,
  ...ActionWidget,
  ...EntryPoint,
  ...Error,
  ...ReadAction,
  ...FollowUpName,
  ...Loading,
  ...WidgetName,
];

export default views;
