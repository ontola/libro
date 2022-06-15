import DialogManager from './DialogManager';
import Document from './Document';
import Footer from './Footer';
import ImageObject from './ImageObject';
import MediaObject from './MediaObject';
import PictureSet from './PictureSet';
import SearchResult from './SearchResult';
import Snackbar from './Snackbar';
import SnackbarManager from './SnackbarManager';
import SocialButton from './SocialButton';
import Thing from './Thing';
import VideoSet from './VideoSet';
import WebPageTabPane from './WebPage';
import WebSite from './WebSite';

export default [
  ...DialogManager,
  ...Document,
  ...Footer,
  ...ImageObject,
  ...MediaObject,
  ...PictureSet,
  ...SearchResult,
  ...Snackbar,
  ...SnackbarManager,
  ...SocialButton,
  ...Thing,
  ...VideoSet,
  ...WebPageTabPane,
  ...WebSite,
];
