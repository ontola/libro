/**
 * This document is purely for including all the views into the code.
 * Please properly include each file when access to the code is needed.
 */
import Action from './Action/index';
import ActionBody from './ActionBody';
import Activity from './Activity';
import AppSignOut from './AppSignOut';
import ArguHome from './ArguHome';
import Argument from './Argument/index';
import Banner from './Banner/Banner';
import Collection from './Collection';
import CollectionFilter from './CollectionFilter';
import CollectionPage from './CollectionPage';
import Comment from './Comment';
import Condition from './Condition';
import Confirmation from './Confirmation';
import ContactPage from './ContactPage';
import DataCube from './DataCube';
import DataType from './DataType';
import Dexes from './Dexes';
import DialogManager from './DialogManager';
import Document from './Document';
import EntryPoint from './EntryPoint';
import Error from './Error';
import ErrorResponse from './ErrorResponse';
import FilterField from './FilterField';
import FilterOption from './FilterOption';
import FormField from './FormField';
import FormGroup from './FormGroup';
import FormOption from './FormOption';
import FormPage from './FormPage';
import Forum from './Forum/index';
import GroenLinks from './GroenLinks';
import Group from './Group';
import ImageObject from './ImageObject';
import InfiniteCollectionPage from './InfiniteCollectionPage';
import RDFProperty from './RDFProperty';
import RDFSClass from './RDFSClass';
import Loading from './Loading';
import MapQuestion from './MapQuestion';
import MediaObject from './MediaObject';
import Meeting from './Meeting/properties/agenda';
import Menu from './MenuNavbar';
import MenuItem from './MenuItem';
import MenuSection from './MenuSection';
import Motion from './Motion';
import Notification from './Notification';
import Organization from './Organization/index';
import Person from './Person';
import Phase from './Phase';
import Project from './Project';
import Placement from './Placement';
import PropertyQuery from './PropertyQuery';
import RIVM from './RIVM';
import SearchResult from './SearchResult';
import SeqComp from './Seq';
import Shop from './Shop';
import Snackbar from './Snackbar';
import SnackbarManager from './SnackbarManager';
import Survey from './Survey';
import Term from './Term';
import Thing from './Thing';
import Timeline from './Timeline';
import Token from './Token';
import User from './User';
import Vocabulary from './Vocabulary';
import Vote from './Vote';
import VoteEvent from './VoteEvent';
import Widget from './Widget';

export function getViews() {
  return [
    ...ActionBody,
    ...Activity,
    ...AppSignOut,
    ...ArguHome,
    ...Term,
    ...Thing,
    ...Action,
    ...Argument,
    ...Banner,
    ...Collection,
    ...CollectionPage,
    ...CollectionFilter,
    ...Comment,
    ...Condition,
    ...Confirmation,
    ...ContactPage,
    ...DataCube,
    ...DataType,
    ...Dexes,
    ...Document,
    ...DialogManager,
    ...EntryPoint,
    ...Error,
    ...ErrorResponse,
    ...FilterField,
    ...FilterOption,
    ...FormField,
    ...FormGroup,
    ...FormOption,
    ...FormPage,
    ...Forum,
    ...GroenLinks,
    ...Group,
    ...ImageObject,
    ...InfiniteCollectionPage,
    ...Loading,
    ...MapQuestion,
    ...MediaObject,
    ...Meeting,
    ...Menu,
    ...MenuItem,
    ...MenuSection,
    ...Motion,
    ...Notification,
    ...Organization,
    ...Person,
    ...Phase,
    ...Project,
    ...Placement,
    ...PropertyQuery,
    ...RDFProperty,
    ...RDFSClass,
    ...RIVM,
    ...SearchResult,
    ...SeqComp,
    ...Shop,
    ...Snackbar,
    ...SnackbarManager,
    ...Survey,
    ...Timeline,
    ...Token,
    ...User,
    ...Vocabulary,
    ...Vote,
    ...VoteEvent,
    ...Widget,
  ];
}

export default function register(lrs) {
  lrs.registerAll(...getViews());
}
