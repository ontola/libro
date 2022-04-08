/**
 * This document is purely for including all the views into the code.
 * Please properly include each file when access to the code is needed.
 */
import { ComponentRegistration } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

import { componentRegistrations } from '../components';
import Flow from '../modules/Flow/views';
import GroenLinks from '../modules/GroenLinks/views';

import Academy from './Academy';
import Action from './Action/index';
import ActionBody from './Form';
import Activity from './Activity';
import AppSignOut from './AppSignOut';
import Argument from './Argument/index';
import Banner from './Banner/Banner';
import BlogPost from './BlogPost';
import Collection from './Collection';
import CollectionFilter from './CollectionFilter';
import CollectionPage from './CollectionPage';
import Comment from './Comment';
import Condition from './Condition';
import Confirmation from './Confirmation';
import ContactPage from './ContactPage';
import CustomForm from './CustomForm';
import DataCube from './DataCube';
import DataType from './DataType';
import Dexes from './Dexes';
import DialogManager from './DialogManager';
import Document from './Document';
import EntryPoint from './EntryPoint';
import Error from './Error';
import ErrorResponse from './ErrorResponse';
import FilterOption from './FilterOption';
import Footer from './Footer';
import FormField from './FormField';
import FormGroup from './FormGroup';
import FormOption from './FormOption';
import FormPage from './FormPage';
import Forum from './Forum/index';
import GrantTree from './GrantTree';
import Group from './Group';
import ImageObject from './ImageObject';
import InfiniteCollectionPage from './InfiniteCollectionPage';
import Opinion from './Opinion';
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
import ontola from './ontola';
import Organization from './Organization';
import Person from './Person';
import Phase from './Phase';
import Project from './Project';
import Placement from './Placement';
import PropertyQuery from './PropertyQuery';
import RichText from './RichText';
import RIVM from './RIVM';
import SalesWebsite from './SalesWebsite';
import SearchResult from './SearchResult';
import SeqComp from './Seq';
import Shop from './Shop';
import Snackbar from './Snackbar';
import SnackbarManager from './SnackbarManager';
import SocialButton from './SocialButton';
import Submission from './Submission';
import SubmissionDataTableCell from './SubmissionData';
import Survey from './Survey';
import Term from './Term';
import Thing from './Thing';
import Timeline from './Timeline';
import Token from './Token';
import User from './User';
import Vocabulary from './Vocabulary';
import VoteEvent from './VoteEvent';
import WebPageTabPane from './WebPage';
import Widget from './Widget';
import LottieAnimation from './LottieAnimation';

export function getViews(): Array<ComponentRegistration<any> | Array<ComponentRegistration<any>>> {
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
    ...BlogPost,
    ...Collection,
    ...CollectionPage,
    ...CollectionFilter,
    ...Comment,
    ...Condition,
    ...Confirmation,
    ...ContactPage,
    ...CustomForm,
    ...DataCube,
    ...DataType,
    ...Dexes,
    ...Document,
    ...DialogManager,
    ...EntryPoint,
    ...Error,
    ...ErrorResponse,
    ...FilterOption,
    ...Flow,
    ...Footer,
    ...FormField,
    ...FormGroup,
    ...FormOption,
    ...FormPage,
    ...Forum,
    ...GrantTree,
    ...GroenLinks,
    ...Group,
    ...ImageObject,
    ...InfiniteCollectionPage,
    ...Loading,
    ...LottieAnimation,
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
    ...RichText,
    ...RIVM,
    ...SearchResult,
    ...SeqComp,
    ...Shop,
    ...Snackbar,
    ...SnackbarManager,
    ...SocialButton,
    ...Submission,
    ...SubmissionDataTableCell,
    ...Survey,
    ...Timeline,
    ...Token,
    ...User,
    ...Vocabulary,
    ...VoteEvent,
    ...WebPageTabPane,
    ...Widget,
  ];
}

export default function register(lrs: LinkReduxLRSType): void {
  lrs.registerAll(...getViews(), ...componentRegistrations());
}
