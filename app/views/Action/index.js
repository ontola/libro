import Actions from './Action';
import ActionActionsBar from './ActionActionsBar';
import ActionCardMain from './ActionCardMain';
import ActionContainer from './ActionContainer';
import ActionDetail from './ActionDetail';
import ActionDropdownContent from './ActionDropdownContent';
import ActionNested from './ActionNested';
import ActionPageReg from './ActionPage';
import ActionPrimaryCallToAction from './ActionPrimaryCallToAction';
import ActionTableCell from './ActionTableCell';
import ActionTableRow from './ActionTableRow';
import ActionWidget from './ActionWidget';
import CreateAction from './CreateAction';
import CreateVote from './CreateVote';
import InlineCreateAction from './InlineCreateAction';
import InlineActionContainerFloat from './InlineActionContainerFloat';
import InlineActionTableRow from './InlineActionTableRow';
import ReadActionCard from './ReadActionCard';
import SignInHelperFormsModal from './SignInHelperFormsModal';
import FollowUpName from './properties/followUpName';
import WidgetName from './properties/widgetName';

export default [
  CreateAction,
  CreateVote,
  Actions,
  ActionActionsBar,
  ActionCardMain,
  ActionContainer,
  ActionDetail,
  ActionDropdownContent,
  ActionNested,
  ActionPageReg,
  ActionPrimaryCallToAction,
  ActionTableCell,
  ActionTableRow,
  ActionWidget,
  InlineCreateAction,
  InlineActionContainerFloat,
  ...InlineActionTableRow,
  ReadActionCard,
  ...SignInHelperFormsModal,
  FollowUpName,
  WidgetName,
];
