import foaf from '@ontologies/foaf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property, link } from 'link-redux';
import React from 'react';

import {
  CardContent,
  Detail,
  LDLink,
  LinkedDetailDate,
} from '../../components';
import { LoadingOpinion } from '../../components/Loading';
import {
  connectHighlighting,
  hightlightPropTypes,
} from '../../containers/Highlight';
import { NS } from '../../helpers/LinkedRenderStore';
import meeting from '../../ontology/meeting';
import ontola from '../../ontology/ontola';
import { cardTopology } from '../../topologies/Card';
import CardFixed, { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardListTopology } from '../../topologies/Card/CardList';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import CardRow, { cardRowTopology } from '../../topologies/Card/CardRow';
import DetailsBar, { detailsBarTopology } from '../../topologies/DetailsBar';
import { gridTopology } from '../../topologies/Grid';
import hoverBox from '../../topologies/HoverBox';

import ApplyLink from './properties/applyLink';
import ArguLocation from './properties/arguLocation';
import Arguments from './properties/arguments';
import CoverPhoto from './properties/coverPhoto';
import CreateAction from './properties/createAction';
import Creator from './properties/creator';
import DateCreated from './properties/dateCreated';
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
import NavbarBackground from './properties/navbarBackground';
import Omniform from './properties/omniform';
import Organization from './properties/organization';
import PinnedAt from './properties/pinnedAt';
import PotentialAction from './properties/potentialAction';
import Predicate from './properties/predicate';
import PublishAction from './properties/publishAction';
import RedirectUrlTable from './properties/redirectUrlTable';
import SuperEvent from './properties/superEvent';
import StartDate from './properties/startDate';
import Text from './properties/text';
import TopComment from './properties/topComment';
import TrashedAt from './properties/trashedAt';
import VoteEvents from './properties/voteEvents';
import ThingContainer from './ThingContainer';
import ThingInline from './ThingInline';
import ThingPage from './ThingPage';
import ThingPageHeader from './ThingPageHeader';
import ThingParent from './ThingParent';
import ThingPopup from './ThingPopup';
import ThingRadioGroup from './ThingRadioGroup';
import ThingSelect from './ThingSelect';
import ThingTable from './ThingTable';
import ThingTableCell from './ThingTableCell';
import ThingTableRow from './ThingTableRow';
import ThingTableHeaderRow from './ThingTableHeaderRow';

const CardHoverBox = hoverBox();

const ThingGrid = () => (
  <CardFixed>
    <LDLink>
      <Property label={ontola.coverPhoto} />
      <CardContent noSpacing>
        <Property label={[schema.name, rdfs.label, foaf.name]} />
        <Property label={[schema.text, schema.description, NS.dbo('abstract')]} />
      </CardContent>
    </LDLink>
    <DetailsBar>
      <Property hideName label={schema.creator} />
      <LinkedDetailDate />
      <Property label={NS.argu('pinnedAt')} />
      <Property short label={NS.argu('expiresAt')} />
      <Property label={NS.argu('followsCount')} />
      <Property label={NS.argu('motionsCount')} />
    </DetailsBar>
  </CardFixed>
);

const ThingHoverBoxHidden = () => (
  <React.Fragment>
    <Property label={schema.text} />
  </React.Fragment>
);

const ThingSection = ({ highlighted }) => (
  <CardHoverBox hiddenChildren={<ThingHoverBoxHidden />} shine={highlighted}>
    <Property label={schema.name} />
  </CardHoverBox>
);

ThingSection.propTypes = hightlightPropTypes;

const ThingCard = () => (
  <CardRow>
    <CardContent>
      <Property label={NS.argu('opinion')} onError={() => null} onLoad={LoadingOpinion} />
      <Property label={[schema.name, rdfs.label, foaf.name]} />
      <Property label={[schema.text, schema.description, NS.dbo('abstract')]} />
      <Property label={meeting.attachment} />
    </CardContent>
  </CardRow>
);

export default [
  ThingContainer,
  ThingPage,
  ThingPageHeader,
  ThingRadioGroup,
  ThingSelect,
  ThingTable,
  ThingTableCell,
  ThingTableHeaderRow,
  ThingTableRow,
  ThingParent,
  ThingPopup,
  ThingInline,
  LinkedRenderStore.registerRenderer(
    connectHighlighting(ThingSection),
    schema.Thing,
    RENDER_CLASS_NAME,
    cardListTopology
  ),
  LinkedRenderStore.registerRenderer(
    connectHighlighting(props => <CardContent><ThingSection {...props} /></CardContent>),
    schema.Thing,
    RENDER_CLASS_NAME,
    cardRowTopology
  ),
  LinkedRenderStore.registerRenderer(
    link({ name: schema.name })(({ name, theme }) => (
      <LDLink data-test="Thing-parent" features={['centered']} theme={theme}>
        <Detail text={name.value} />
      </LDLink>
    )),
    schema.Thing,
    RENDER_CLASS_NAME,
    detailsBarTopology
  ),
  LinkedRenderStore.registerRenderer(
    ThingGrid,
    schema.Thing,
    RENDER_CLASS_NAME,
    gridTopology
  ),
  LinkedRenderStore.registerRenderer(
    ThingCard,
    schema.Thing,
    RENDER_CLASS_NAME,
    [
      cardFixedTopology,
      cardMainTopology,
      cardTopology,
    ]
  ),
  ApplyLink,
  ...Arguments,
  ArguLocation,
  ...CoverPhoto,
  CreateAction,
  Creator,
  DateCreated,
  DatePublished,
  DateSubmitted,
  description,
  ExpiresAt,
  FollowsCount,
  GrantedGroups,
  IsPrimaryTopicOf,
  IsPartOf,
  Image,
  Location,
  Menus,
  MotionsCount,
  ...Name,
  NavbarBackground,
  ...Omniform,
  Organization,
  PinnedAt,
  Predicate,
  SuperEvent,
  ...PotentialAction,
  PublishAction,
  RedirectUrlTable,
  StartDate,
  ...Text,
  TopComment,
  TrashedAt,
  VoteEvents,
];
