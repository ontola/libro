import { ViewRegistrations } from '../../../Module';

import Activity from './Activity';
import Argument from './Argument/index';
import Banner from './Banner/Banner';
import BlogPost from './BlogPost';
import Comment from './Comment';
import CustomForm from './CustomForm';
import FormField from './FormField';
import Forum from './Forum/index';
import GrantTree from './GrantTree';
import Group from './Group';
import Invite from './Invite';
import LinkedRecord from './LinkedRecord';
import Motion from './Motion';
import Notification from './Notification';
import Person from './Person';
import Phase from './Phase';
import Placement from './Placement';
import Poll from './Poll';
import Project from './Project';
import Shop from './Shop';
import Submission from './Submission';
import SubmissionDataTableCell from './SubmissionData';
import Survey from './Survey';
import Term from './Term';
import Thing from './Thing';
import Timeline from './Timeline';
import Token from './Token';
import Vocabulary from './Vocabulary';
import VoteEvent from './VoteEvent';
import Widget from './Widget';

const views: ViewRegistrations = [
  ...Activity,
  ...Argument,
  ...Banner,
  ...BlogPost,
  ...Comment,
  ...CustomForm,
  ...FormField,
  ...Forum,
  ...GrantTree,
  ...Group,
  ...Invite,
  ...LinkedRecord,
  ...Motion,
  ...Notification,
  ...Person,
  ...Phase,
  ...Poll,
  ...Project,
  ...Placement,
  ...Shop,
  ...Submission,
  ...SubmissionDataTableCell,
  ...Survey,
  ...Term,
  ...Thing,
  ...Timeline,
  ...Token,
  ...Vocabulary,
  ...VoteEvent,
  ...Widget,
];

export default views;
