/**
 * This document is purely for including all the views into the code.
 * Please properly include each file when access to the code is needed.
 */
import { componentRegistrations } from '../components';

import Academy from './Academy';
import Action from './Action/index';
import ActionBody from './ActionBody';
import Activity from './Activity';
import AppSignOut from './AppSignOut';
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
import Elements from './Elements';
import EntryPoint from './EntryPoint';
import Error from './Error';
import ErrorResponse from './ErrorResponse';
import FilterField from './FilterField';
import FilterOption from './FilterOption';
import Footer from './Footer';
import FormField from './FormField';
import FormGroup from './FormGroup';
import FormOption from './FormOption';
import FormPage from './FormPage';
import Forum from './Forum/index';
import GroenLinks from './GroenLinks';
import Group from './Group';
import ImageObject from './ImageObject';
import InfiniteCollectionPage from './InfiniteCollectionPage';
import Opinion from './Opinion';
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
import ontola from './ontola';
import Organization from './Organization';
import Person from './Person';
import Phase from './Phase';
import Project from './Project';
import Placement from './Placement';
import PropertyQuery from './PropertyQuery';
import RIVM from './RIVM';
import SalesWebsite from './SalesWebsite';
import SearchResult from './SearchResult';
import SeqComp from './Seq';
import Shop from './Shop';
import Snackbar from './Snackbar';
import SnackbarManager from './SnackbarManager';
import SocialButton from './SocialButton';
import Survey from './Survey';
import Term from './Term';
import Thing from './Thing';
import Timeline from './Timeline';
import Token from './Token';
import User from './User';
import Vocabulary from './Vocabulary';
import VoteEvent from './VoteEvent';
import Widget from './Widget';

export function getViews() {
  return [
    ...Academy,
    ...ActionBody,
    ...Activity,
    ...AppSignOut,
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
    ...Elements,
    ...EntryPoint,
    ...Error,
    ...ErrorResponse,
    ...FilterField,
    ...FilterOption,
    ...Footer,
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
    ...ontola,
    ...Opinion,
    ...Organization,
    ...Person,
    ...Phase,
    ...Project,
    ...SalesWebsite,
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
    ...SocialButton,
    ...Survey,
    ...Timeline,
    ...Token,
    ...User,
    ...Vocabulary,
    ...VoteEvent,
    ...Widget,
  ];
}

export default function register(lrs) {
  lrs.registerAll(...getViews(), ...componentRegistrations());
}
