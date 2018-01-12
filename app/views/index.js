import LRS from '../helpers/LinkedRenderStore';

/**
 * This document is purely for including all the views into the code.
 * Please properly include each file when access to the code is needed.
 */
import Thing from './Thing';
import Collection from './Collection';
// import './Comment';
import CreateAction from './CreateAction';
import EntryPoint from './EntryPoint';
import GuestUserActor from './GuestUserActor';
import Forum from './Forum';
import ImageObject from './ImageObject';
import InfiniteCollection from './InfiniteCollection';
// import './LinkedRecord';
import MenuItem from './MenuItem';
import MenuSection from './MenuSection';
// import './Motion';
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
// import './VoteCompareCells';
// import './VoteCompareRows';
// import './VoteEvent';
// import './VoteEventCollection';
// import './VoteMatch';
// import './VoteSide';
// import './VoteSidePage';

LRS.registerAll(
  ...Thing,
  ...CreateAction,
  ...Collection,
  ...EntryPoint,
  Forum,
  GuestUserActor,
  ...ImageObject,
  ...InfiniteCollection,
  ...MenuItem,
  ...MenuSection,
  ...NavigationsMenu,
  ...Notification,
  ...OrganizationsMenu,
  ...Organization,
  ...Person,
  SeqComp,
  ...SubMenu,
  UserActor
);
