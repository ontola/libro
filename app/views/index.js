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
import CreativeWork from './CreativeWork';
import Action from './Action/index';
import Argument from './Argument/index';
import DataCube from './DataCube';
import DialogManager from './DialogManager';
import Document from './Document';
import EntryPoint from './EntryPoint';
import Error from './Error';
import Forum from './Forum/index';
import ImageObject from './ImageObject';
import InfiniteCollectionPage from './InfiniteCollectionPage';
import RDFProperty from './RDFProperty';
import RDFSClass from './RDFSClass';
import Loading from './Loading';
import MediaObject from './MediaObject';
import Meeting from './Meeting/properties/agenda';
import Menu from './Menu';
import MenuItem from './MenuItem';
import MenuSection from './MenuSection';
import Motion from './Motion';
import Notification from './Notification';
// import './OpinionBubble';
import Organization from './Organization/index';
import Person from './Person';
import Placement from './Placement';
import PropertyQuery from './PropertyQuery';
import SeqComp from './Seq';
import Shape from './Shape';
import Snackbar from './Snackbar';
import SnackbarManager from './SnackbarManager';
import User from './User';
import Vote from './Vote';
// import './VoteCompareCells';
// import './VoteCompareRows';
import VoteEvent from './VoteEvent';
// import './VoteEventCollection';
// import './VoteMatch';
import Widget from './Widget';

function register() {
  LRS.registerAll(
    ...Activity,
    ...Thing,
    ...Action,
    ...Argument,
    ...Collection,
    ...CollectionPage,
    ...Comment,
    ...CreativeWork,
    ...DataCube,
    ...Document,
    ...DialogManager,
    ...EntryPoint,
    ...Error,
    ...Forum,
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
    ...SeqComp,
    ...Shape,
    ...Snackbar,
    ...SnackbarManager,
    ...User,
    ...Vote,
    ...VoteEvent,
    ...Widget
  );
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
        register();
        break;
      default:
        break;
    }
  });
}

register();
