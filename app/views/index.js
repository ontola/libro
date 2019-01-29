import LRS from '../helpers/LinkedRenderStore';
import { error } from '../helpers/logging';

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
import DialogManager from './DialogManager';
import Document from './Document';
import EntryPoint from './EntryPoint';
import Error from './Error';
import Forum from './Forum/index';
import ImageObject from './ImageObject';
import InfiniteCollectionPage from './InfiniteCollectionPage';
import RDFSClass from './RDFSClass';
import Loading from './Loading';
import MediaObject from './MediaObject';
import Meeting from './Meeting/properties/agenda';
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
import SubMenu from './SubMenu';
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
    ...MenuItem,
    ...MenuSection,
    ...Motion,
    ...Notification,
    ...Organization,
    ...Person,
    ...Placement,
    ...PropertyQuery,
    ...RDFSClass,
    ...SeqComp,
    ...Shape,
    ...Snackbar,
    ...SnackbarManager,
    ...SubMenu,
    ...User,
    ...Vote,
    ...VoteEvent,
    ...Widget
  );
}

if (module.hot) {
  module.hot.accept();

  module.hot.dispose(() => {
    LRS.mapping.lookupCache = {};
    LRS.mapping.mapping = [];
  });

  module.hot.addStatusHandler((status) => {
    if (status !== 'ready') {
      return;
    }

    module.hot.apply()
      .then(() => {
        register();
      }).catch(() => {
        error('app/views hot reload failed');
      });
  });
}

register();
