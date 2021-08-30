import ActionCardRow from './ActionCardRow';
import ActionContainer from './ActionContainer';
import ActionContainerFloat from './ActionContainerFloat';
import ActionContainerHeader from './ActionContainerHeader';
import ActionDetail from './ActionDetail';
import ActionDropdownContent from './ActionDropdownContent';
import ActionFull from './ActionFull';
import ActionWidget from './ActionGrid';
import ActionInline from './ActionInline';
import ActionMain from './ActionMain';
import ActionNested from './ActionNested';
import ActionTableCell from './ActionTableCell';
import ActionTableRow from './ActionTableRow';
import CreateAction from './CreateAction';
import CreateSession from './CreateSession';
import CreateVote from './CreateVote';
import FollowUpName from './properties/followUpName';
import WidgetName from './properties/gridName';
import ReadAction from './ReadAction';

export default [
  ...CreateAction,
  ...CreateSession,
  ...CreateVote,
  ActionMain,
  ActionCardRow,
  ActionContainer,
  ActionContainerFloat,
  ActionContainerHeader,
  ActionDetail,
  ActionDropdownContent,
  ActionInline,
  ActionNested,
  ActionFull,
  ActionTableCell,
  ActionTableRow,
  ActionWidget,
  ...ReadAction,
  FollowUpName,
  WidgetName,
];
