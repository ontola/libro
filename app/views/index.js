/**
 * This document is purely for including all the views into the code.
 * Please properly include each file when access to the code is needed.
 */
import Action from './Action/index';
import ActionBody from './ActionBody';
import Activity from './Activity';
import Address from './Address';
import AppSignOut from './AppSignOut';
import ArguHome from './ArguHome';
import Argument from './Argument/index';
import Badge from './Badge';
import Banner from './Banner/Banner';
import Category from './Category';
import Collection from './Collection';
import CollectionFilter from './CollectionFilter';
import CollectionPage from './CollectionPage';
import Comment from './Comment';
import Condition from './Condition';
import Confirmation from './Confirmation';
import ContactPage from './ContactPage';
import Dashboard from './Dashboard';
import DataCube from './DataCube';
import DataType from './DataType';
import Department from './Department';
import DexesAgreement from './DexesAgreement';
import DexesInvite from './DexesInvite';
import DexesOffer from './DexesOffer';
import DexTransfer from './DexTransfer';
import DialogManager from './DialogManager';
import Document from './Document';
import Employment from './Employment';
import EntryPoint from './EntryPoint';
import Error from './Error';
import ErrorResponse from './ErrorResponse';
import Event from './Event';
import FilterField from './FilterField';
import FilterOption from './FilterOption';
import Folder from './Folder';
import FolderEntry from './FolderEntry';
import FormField from './FormField';
import FormGroup from './FormGroup';
import FormOption from './FormOption';
import FormPage from './FormPage';
import Forum from './Forum/index';
import Glapp from './Glapp';
import Group from './Group';
import GroupMembership from './GroupMembership';
import ImageObject from './ImageObject';
import Incident from './Incident';
import InfiniteCollectionPage from './InfiniteCollectionPage';
import Intervention from './Intervention';
import InterventionType from './InterventionType';
import PostalCode from './PostalCode';
import ProductPage from './ProductPage';
import RDFProperty from './RDFProperty';
import RDFSClass from './RDFSClass';
import LandingPage from './LandingPage';
import Loading from './Loading';
import MapQuestion from './MapQuestion';
import Measure from './Measure';
import MeasureType from './MeasureType';
import MediaObject from './MediaObject';
import Meeting from './Meeting/properties/agenda';
import Menu from './MenuNavbar';
import MenuItem from './MenuItem';
import MenuSection from './MenuSection';
import Motion from './Motion';
import Notification from './Notification';
import Organization from './Organization/index';
import Participant from './Participant';
import Person from './Person';
import Phase from './Phase';
import Project from './Project';
import Placement from './Placement';
import PropertyQuery from './PropertyQuery';
import Risk from './Risk';
import Scenario from './Scenario';
import SearchResult from './SearchResult';
import SeqComp from './Seq';
import Snackbar from './Snackbar';
import SnackbarManager from './SnackbarManager';
import Street from './Street';
import Survey from './Survey';
import TargetProgress from './TargetProgress';
import Thing from './Thing';
import Timeline from './Timeline';
import Token from './Token';
import User from './User';
import Volunteer from './Volunteer';
import Vote from './Vote';
import VoteEvent from './VoteEvent';
import Widget from './Widget';

export function getViews() {
  return [
    ...ActionBody,
    ...Activity,
    ...Address,
    ...AppSignOut,
    ...ArguHome,
    ...Thing,
    ...Action,
    ...Argument,
    ...Badge,
    ...Banner,
    ...Category,
    ...Collection,
    ...CollectionPage,
    ...CollectionFilter,
    ...Comment,
    ...Condition,
    ...Confirmation,
    ...ContactPage,
    ...Dashboard,
    ...DataCube,
    ...DataType,
    ...Department,
    ...DexesAgreement,
    ...DexesInvite,
    ...DexesOffer,
    ...DexTransfer,
    ...Document,
    ...DialogManager,
    ...Employment,
    ...EntryPoint,
    ...Error,
    ...ErrorResponse,
    ...Event,
    ...FilterField,
    ...FilterOption,
    ...Folder,
    ...FolderEntry,
    ...FormField,
    ...FormGroup,
    ...FormOption,
    ...FormPage,
    ...Forum,
    ...Glapp,
    ...Group,
    ...GroupMembership,
    ...ImageObject,
    ...Incident,
    ...Intervention,
    ...InterventionType,
    ...InfiniteCollectionPage,
    ...LandingPage,
    ...Loading,
    ...MapQuestion,
    ...Measure,
    ...MeasureType,
    ...MediaObject,
    ...Meeting,
    ...Menu,
    ...MenuItem,
    ...MenuSection,
    ...Motion,
    ...Notification,
    ...Organization,
    ...Participant,
    ...Person,
    ...Phase,
    ...Project,
    ...ProductPage,
    ...Placement,
    ...PostalCode,
    ...PropertyQuery,
    ...RDFProperty,
    ...RDFSClass,
    ...Risk,
    ...Scenario,
    ...SearchResult,
    ...SeqComp,
    ...Snackbar,
    ...SnackbarManager,
    ...Street,
    ...Survey,
    ...TargetProgress,
    ...Timeline,
    ...Token,
    ...User,
    ...Volunteer,
    ...Vote,
    ...VoteEvent,
    ...Widget,
  ];
}

export default function register(lrs) {
  lrs.registerAll(...getViews());
}
