import { ViewRegistrations } from '../../../Module';

import DataType from './DataType';
import DialogManager from './DialogManager';
import Document from './Document';
import Error from './Error';
import Footer from './Footer';
import ImageObject from './ImageObject';
import Loading from './Loading';
import MediaObject from './MediaObject';
import PictureSet from './PictureSet';
import PropertyQuery from './PropertyQuery';
import RDFProperty from './RDFProperty';
import RDFSClass from './RDFSClass';
import SearchResult from './SearchResult';
import Seq from './Seq';
import Snackbar from './Snackbar';
import SnackbarManager from './SnackbarManager';
import SocialButton from './SocialButton';
import Thing from './Thing';
import VideoSet from './VideoSet';
import WebPageTabPane from './WebPage';
import WebSite from './WebSite';

const views: ViewRegistrations = [
  ...DataType,
  ...DialogManager,
  ...Document,
  ...Error,
  ...Footer,
  ...ImageObject,
  ...Loading,
  ...MediaObject,
  ...PictureSet,
  ...PropertyQuery,
  ...RDFProperty,
  ...RDFSClass,
  ...SearchResult,
  ...Seq,
  ...Snackbar,
  ...SnackbarManager,
  ...SocialButton,
  ...Thing,
  ...VideoSet,
  ...WebPageTabPane,
  ...WebSite,
];

export default views;
