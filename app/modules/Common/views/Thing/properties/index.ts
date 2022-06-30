import Attachments from './attachmentsCardRow';
import AttachmentsMainBody from './attachmentsMainBody';
import ContentUrl from './contentUrl';
import CoverPhoto from './coverPhoto';
import CreateAction from './createAction';
import Creator from './creator';
import DateCreated from './dateCreated';
import DateModified from './dateModified';
import DatePublished from './datePublished';
import DateSubmitted from './dateSubmitted';
import Description from './description';
import DownloadUrl from './downloadUrl';
import ExpiresAt from './expiresAt';
import FavoriteAction from './favoriteAction';
import Image from './image';
import IsPartOf from './isPartOf';
import IsPrimaryTopicOf from './isPrimaryTopicOf';
import Location from './location';
import Menus from './menus';
import Name from './name';
import Order from './order';
import PublishAction from './publishAction';
import StartDate from './startDate';
import SuperEvent from './superEvent';
import Text from './text';
import TextCardFixed from './textCardFixed';
import TrashedAt from './trashedAt';
import Type from './type';

export default [
  Attachments,
  AttachmentsMainBody,
  ContentUrl,
  ...CoverPhoto,
  CreateAction,
  Creator,
  DateCreated,
  DateModified,
  DatePublished,
  DateSubmitted,
  Description,
  DownloadUrl,
  ExpiresAt,
  FavoriteAction,
  Image,
  IsPartOf,
  IsPrimaryTopicOf,
  Location,
  Menus,
  ...Name,
  Order,
  PublishAction,
  StartDate,
  SuperEvent,
  ...Text,
  TextCardFixed,
  TrashedAt,
  Type,
];
