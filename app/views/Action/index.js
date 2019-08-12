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
import InlineCreateActionContainerFloat from './InlineCreateActionContainerFloat';
import InlineActionTableRow from './InlineActionTableRow';
import ReadActionCard from './ReadActionCard';
import SignInHelperFormsModal from './SignInHelperFormsModal';
import Name from './properties/name';

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
  InlineCreateActionContainerFloat,
  ...InlineActionTableRow,
  ReadActionCard,
  ...SignInHelperFormsModal,
  Name,
];
