import LRS from '../helpers/LinkedRenderStore';

/**
 * This document is purely for including all the views into the code.
 * Please properly include each file when access to the code is needed.
 */
import Activity from './Activity';
import Thing from './Thing';
import Collection from './Collection';
import CollectionPage from './CollectionPage';
import Comment from './Comment';
import Action from './Action/index';
import Argument from './Argument/index';
import EntryPoint from './EntryPoint';
import Error from './Error';
import Forum from './Forum';
import ImageObject from './ImageObject';
import InfiniteCollectionView from './InfiniteCollectionView';
import RDFSClass from './RDFSClass';
// import './LinkedRecord';
import Loading from './Loading';
import MenuItem from './MenuItem';
import MenuSection from './MenuSection';
import Motion from './Motion';
import Notification from './Notification';
// import './OpinionBubble';
import Organization from './Organization';
import Person from './Person';
// import './Question';
import SeqComp from './Seq';
import Shape from './Shape';
import SubMenu from './SubMenu';
import User from './User';
import Vote from './Vote';
// import './VoteCompareCells';
// import './VoteCompareRows';
import VoteEvent from './VoteEvent';
// import './VoteEventCollection';
// import './VoteMatch';
import Widget from './Widget';

LRS.registerAll(
  ...Activity,
  ...Thing,
  ...Action,
  ...Argument,
  ...Collection,
  ...CollectionPage,
  ...Comment,
  ...EntryPoint,
  ...Error,
  Forum,
  ...ImageObject,
  ...InfiniteCollectionView,
  ...Loading,
  ...MenuItem,
  ...MenuSection,
  Motion,
  ...Notification,
  ...Organization,
  ...Person,
  ...RDFSClass,
  SeqComp,
  ...Shape,
  ...SubMenu,
  ...User,
  ...Vote,
  ...VoteEvent,
  Widget
);
