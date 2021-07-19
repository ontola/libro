import * as schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import {
  connectHighlighting,
  hightlightPropTypes,
} from '../../containers/Highlight';
import { cardListTopology } from '../../topologies/Card/CardList';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import HoverBox from '../../topologies/HoverBox';

import ApplyLink from './properties/applyLink';
import ArguLocation from './properties/arguLocation';
import Arguments from './properties/arguments';
import Attachments from './properties/attatchments';
import ContentUrl from './properties/contentUrl';
import CoverPhoto from './properties/coverPhoto';
import CreateAction from './properties/createAction';
import Creator from './properties/creator';
import DateCreated from './properties/dateCreated';
import DateModified from './properties/dateModified';
import DatePublished from './properties/datePublished';
import DateSubmitted from './properties/dateSubmitted';
import description from './properties/description';
import ExpiresAt from './properties/expiresAt';
import FollowsCount from './properties/followsCount';
import GrantedGroups from './properties/grantedGroups';
import Image from './properties/image';
import IsPartOf from './properties/isPartOf';
import IsPrimaryTopicOf from './properties/isPrimaryTopicOf';
import Location from './properties/location';
import Menus from './properties/menus';
import MotionsCount from './properties/motionsCount';
import Name from './properties/name';
import Omniform from './properties/omniform';
import PinnedAt from './properties/pinnedAt';
import FavoriteAction from './properties/favoriteAction';
import Predicate from './properties/predicate';
import Price from './properties/price';
import PublishAction from './properties/publishAction';
import RedirectUrlTable from './properties/redirectUrlTable';
import SuperEvent from './properties/superEvent';
import StartDate from './properties/startDate';
import Text from './properties/text';
import TextCardFixed from './properties/textCardFixed';
import TopComment from './properties/topComment';
import TrashedAt from './properties/trashedAt';
import Type from './properties/type';
import VoteEvents from './properties/voteEvents';
import ThingCard from './ThingCard';
import ThingContainer from './ThingContainer';
import ThingDetailsBar from './ThingDetailsBar';
import ThingFooter from './ThingFooter';
import ThingInline from './ThingInline';
import ThingFullResource from './ThingFull';
import ThingGrid from './ThingGrid';
import ThingMenu from './ThingMenu';
import ThingPage from './ThingPage';
import ThingPageHeader from './ThingPageHeader';
import ThingParent from './ThingParent';
import ThingRadioGroup from './ThingRadioGroup';
import ThingSelect from './ThingSelect';
import ThingTable from './ThingTable';
import ThingTableCell from './ThingTableCell';
import ThingTableRow from './ThingTableRow';
import ThingTableHeaderRow from './ThingTableHeaderRow';

const ThingHoverBoxHidden = () => (
  <Property label={schema.text} />
);

const ThingSection = ({ highlighted }) => (
  <HoverBox hiddenChildren={<ThingHoverBoxHidden />} shine={highlighted}>
    <Property label={schema.name} />
  </HoverBox>
);

ThingSection.propTypes = hightlightPropTypes;

export default [
  ThingCard,
  ThingContainer,
  ThingDetailsBar,
  ThingFooter,
  ThingFullResource,
  ThingGrid,
  ThingMenu,
  ThingPage,
  ThingPageHeader,
  ThingRadioGroup,
  ThingSelect,
  ThingTable,
  ThingTableCell,
  ThingTableHeaderRow,
  ThingTableRow,
  ThingParent,
  ThingInline,
  LinkedRenderStore.registerRenderer(
    connectHighlighting(ThingSection),
    schema.Thing,
    RENDER_CLASS_NAME,
    cardListTopology
  ),
  LinkedRenderStore.registerRenderer(
    connectHighlighting((props) => <CardContent><ThingSection {...props} /></CardContent>),
    schema.Thing,
    RENDER_CLASS_NAME,
    cardRowTopology
  ),
  ApplyLink,
  ...Arguments,
  ArguLocation,
  Attachments,
  ContentUrl,
  ...CoverPhoto,
  CreateAction,
  Creator,
  ...DateCreated,
  DateModified,
  DatePublished,
  DateSubmitted,
  description,
  ExpiresAt,
  FollowsCount,
  ...GrantedGroups,
  IsPrimaryTopicOf,
  IsPartOf,
  Image,
  Location,
  Menus,
  MotionsCount,
  ...Name,
  ...Omniform,
  PinnedAt,
  Predicate,
  Price,
  SuperEvent,
  FavoriteAction,
  PublishAction,
  RedirectUrlTable,
  StartDate,
  ...Text,
  TextCardFixed,
  TopComment,
  TrashedAt,
  Type,
  VoteEvents,
];
