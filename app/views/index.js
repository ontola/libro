import LRS from '../helpers/LinkedRenderStore';

/**
 * This document is purely for including all the views into the code.
 * Please properly include each file when access to the code is needed.
 */
import Thing from './Thing';
import Collection from './Collection';
import Comment from './Comment';
import Action from './Action/index';
import Argument from './Argument/index';
import EntryPoint from './EntryPoint';
import Error from './Error';
import GuestUserActor from './GuestUserActor';
import Forum from './Forum';
import ImageObject from './ImageObject';
import InfiniteCollection from './InfiniteCollection';
import RDFSClass from './RDFSClass';
// import './LinkedRecord';
import Loading from './Loading';
import MenuItem from './MenuItem';
import MenuSection from './MenuSection';
import Motion from './Motion';
import NavigationsMenu from './NavigationsMenu';
import Notification from './Notification';
import OrganizationsMenu from './OrganizationsMenu';
// import './OpinionBubble';
import Organization from './Organization';
import Person from './Person';
import SubMenu from './SubMenu';
// import './Question';
import SeqComp from './Seq';
import UserActor from './UserActor';
import Vote from './Vote';
// import './VoteCompareCells';
// import './VoteCompareRows';
import VoteEvent from './VoteEvent';
// import './VoteEventCollection';
// import './VoteMatch';
import Widget from './Widget';

LRS.registerAll(
  ...Thing,
  ...Action,
  ...Argument,
  ...Collection,
  ...Comment,
  EntryPoint,
  ...Error,
  Forum,
  GuestUserActor,
  ...ImageObject,
  ...InfiniteCollection,
  ...Loading,
  ...MenuItem,
  ...MenuSection,
  Motion,
  ...NavigationsMenu,
  ...Notification,
  ...OrganizationsMenu,
  ...Organization,
  ...Person,
  ...RDFSClass,
  SeqComp,
  ...SubMenu,
  ...UserActor,
  ...Vote,
  ...VoteEvent,
  Widget
);
