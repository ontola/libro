import Actions from './Action';
import ActionActionsBar from './ActionActionsBar';
import ActionContainer from './ActionContainer';
import ActionDetail from './ActionDetail';
import ActionNested from './ActionNested';
import ActionPage from './ActionPage';
import ActionPrimaryCallToAction from './ActionPrimaryCallToAction';
import ActionTableCell from './ActionTableCell';
import ActionTableRow from './ActionTableRow';
import ActionWidget from './ActionWidget';
import CreateAction from './CreateAction';
import CreateVote from './CreateVote';
import InlineCreateAction from './InlineCreateAction';
import InlineActionTableRow from './InlineActionTableRow';
import ReadActionCard from './ReadActionCard';
import SignInHelperFormsModal from './SignInHelperFormsModal';
import Name from './properties/name';

export default [
  CreateAction,
  CreateVote,
  Actions,
  ActionActionsBar,
  ActionContainer,
  ActionDetail,
  ActionNested,
  ActionPage,
  ActionPrimaryCallToAction,
  ActionTableCell,
  ActionTableRow,
  ActionWidget,
  InlineCreateAction,
  ...InlineActionTableRow,
  ReadActionCard,
  ...SignInHelperFormsModal,
  Name,
];
