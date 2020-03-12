/**
 * This document is purely for including all the views into the code.
 * Please properly include each file when access to the code is needed.
 */
import Activity from './Activity';
import AppSignIn from './AppSignIn';
import AppSignOut from './AppSignOut';
import ArguHome from './ArguHome';
import Thing from './Thing';
import Badge from './Badge';
import Category from './Category';
import Collection from './Collection';
import CollectionPage from './CollectionPage';
import Comment from './Comment';
import Confirmation from './Confirmation';
import Action from './Action/index';
import Argument from './Argument/index';
import DataCube from './DataCube';
import Department from './Department';
import DialogManager from './DialogManager';
import Document from './Document';
import Employment from './Employment';
import EntryPoint from './EntryPoint';
import Error from './Error';
import Event from './Event';
import FormOption from './FormOption';
import Forum from './Forum/index';
import Group from './Group';
import GroupMembership from './GroupMembership';
import ImageObject from './ImageObject';
import Incident from './Incident';
import InfiniteCollectionPage from './InfiniteCollectionPage';
import Intervention from './Intervention';
import InterventionType from './InterventionType';
import RDFProperty from './RDFProperty';
import RDFSClass from './RDFSClass';
import Loading from './Loading';
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
import Shape from './Shape';
import Snackbar from './Snackbar';
import SnackbarManager from './SnackbarManager';
import Survey from './Survey';
import Token from './Token';
import User from './User';
import VideoPage from './VideoPage';
import View from './View';
import Volunteer from './Volunteer';
import Vote from './Vote';
import VoteEvent from './VoteEvent';
import Widget from './Widget';

export function getViews() {
  return [
    ...Activity,
    ...AppSignIn,
    ...AppSignOut,
    ...ArguHome,
    ...Thing,
    ...Action,
    ...Argument,
    ...Badge,
    ...Category,
    ...Collection,
    ...CollectionPage,
    ...Comment,
    ...Confirmation,
    ...DataCube,
    ...Department,
    ...Document,
    ...DialogManager,
    ...Employment,
    ...EntryPoint,
    ...Error,
    ...Event,
    ...FormOption,
    ...Forum,
    ...Group,
    ...GroupMembership,
    ...ImageObject,
    ...Incident,
    ...Intervention,
    ...InterventionType,
    ...InfiniteCollectionPage,
    ...Loading,
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
    ...Placement,
    ...PropertyQuery,
    ...RDFProperty,
    ...RDFSClass,
    ...Risk,
    ...Scenario,
    ...SearchResult,
    ...SeqComp,
    ...Shape,
    ...Snackbar,
    ...SnackbarManager,
    ...Survey,
    ...Token,
    ...User,
    ...VideoPage,
    ...View,
    ...Volunteer,
    ...Vote,
    ...VoteEvent,
    ...Widget,
  ];
}

export default function register(lrs) {
  lrs.registerAll(...getViews());
}
