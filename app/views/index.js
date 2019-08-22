import LRS from '../helpers/LinkedRenderStore';

/**
 * This document is purely for including all the views into the code.
 * Please properly include each file when access to the code is needed.
 */
import Activity from './Activity';
import AppSignIn from './AppSignIn';
import AppSignOut from './AppSignOut';
import Thing from './Thing';
import Collection from './Collection';
import CollectionPage from './CollectionPage';
import Comment from './Comment';
import CreativeWork from './CreativeWork';
import Action from './Action/index';
import Argument from './Argument/index';
import DataCube from './DataCube';
import Department from './Department';
import DialogManager from './DialogManager';
import Document from './Document';
import EntryPoint from './EntryPoint';
import Error from './Error';
import Forum from './Forum/index';
import Group from './Group';
import GroupMembership from './GroupMembership';
import ImageObject from './ImageObject';
import InfiniteCollectionPage from './InfiniteCollectionPage';
import RDFProperty from './RDFProperty';
import RDFSClass from './RDFSClass';
import Loading from './Loading';
import MediaObject from './MediaObject';
import Meeting from './Meeting/properties/agenda';
import Menu from './MenuNavbar';
import MenuItem from './MenuItem';
import MenuSection from './MenuSection';
import Motion from './Motion';
import Notification from './Notification';
import Organization from './Organization/index';
import Person from './Person';
import Placement from './Placement';
import PropertyQuery from './PropertyQuery';
import Risk from './Risk';
import SearchResult from './SearchResult';
import SeqComp from './Seq';
import Shape from './Shape';
import Snackbar from './Snackbar';
import SnackbarManager from './SnackbarManager';
import User from './User';
import VideoPage from './VideoPage';
import Volunteer from './Volunteer';
import Vote from './Vote';
import VoteEvent from './VoteEvent';
import Widget from './Widget';

export function getViews() {
  return [
    ...Activity,
    ...AppSignIn,
    ...AppSignOut,
    ...Thing,
    ...Action,
    ...Argument,
    ...Collection,
    ...CollectionPage,
    ...Comment,
    ...CreativeWork,
    ...DataCube,
    ...Department,
    ...Document,
    ...DialogManager,
    ...EntryPoint,
    ...Error,
    ...Forum,
    ...Group,
    ...GroupMembership,
    ...ImageObject,
    ...InfiniteCollectionPage,
    ...Loading,
    ...MediaObject,
    ...Meeting,
    ...Menu,
    ...MenuItem,
    ...MenuSection,
    ...Motion,
    ...Notification,
    ...Organization,
    ...Person,
    ...Placement,
    ...PropertyQuery,
    ...RDFProperty,
    ...RDFSClass,
    ...Risk,
    ...SearchResult,
    ...SeqComp,
    ...Shape,
    ...Snackbar,
    ...SnackbarManager,
    ...User,
    ...VideoPage,
    ...Volunteer,
    ...Vote,
    ...VoteEvent,
    ...Widget,
  ];
}

export default function register(lrs) {
  lrs.registerAll(...getViews());
}

if (module.hot) {
  module.hot.accept();

  module.hot.addStatusHandler((status) => {
    switch (status) {
      case 'prepare':
        LRS.mapping.lookupCache = {};
        LRS.mapping.mapping = [];
        break;
      case 'apply':
        register(LRS);
        break;
      default:
        break;
    }
  });
}
