import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link, Property } from 'link-redux';
import React from 'react';

import {
  CardContent,
  Detail,
  LDLink,
} from '../../components';
import {
  connectHighlighting,
  hightlightPropTypes,
} from '../../containers/Highlight';
import { NS } from '../../helpers/LinkedRenderStore';
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
import DateCreated from './properties/dateCreated';
import DateSubmitted from './properties/dateSubmitted';
import description from './properties/description';
import ExpiresAt from './properties/expiresAt';
import FollowsCount from './properties/followsCount';
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
import SuperEvent from './properties/superEvent';
import Text from './properties/text';
import TopComment from './properties/topComment';
import TrashedAt from './properties/trashedAt';
import UpdateAction from './properties/updateAction';
import VoteEvents from './properties/voteEvents';
import ThingContainer from './ThingContainer';
import ThingInline from './ThingInline';
import ThingPage from './ThingPage';
import ThingPageHeader from './ThingPageHeader';
import ThingParent from './ThingParent';
import ThingPopup from './ThingPopup';
import ThingSelect from './ThingSelect';
import ThingTable from './ThingTable';
import ThingTableCell from './ThingTableCell';
import ThingTableRow from './ThingTableRow';
import ThingTableHeaderRow from './ThingTableHeaderRow';

const CardHoverBox = hoverBox();

const ThingGrid = () => (
  <CardFixed>
    <LDLink>
      <Property label={NS.argu('coverPhoto')} />
      <CardContent noSpacing>
        <Property label={[NS.schema('name'), NS.rdfs('label')]} />
        <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
      </CardContent>
    </LDLink>
    <DetailsBar>
      <Property label={NS.argu('pinnedAt')} />
      <Property short label={NS.argu('expiresAt')} />
      <Property label={NS.schema('creator')}>
        <LDLink features={['centered']}>
          <div className="Detail">
            <Property label={NS.schema('image')} />
          </div>
        </LDLink>
      </Property>
      <Property label={NS.argu('followsCount')} />
      <Property label={NS.argu('motionsCount')} />
      <Property label={NS.schema('dateCreated')} />
    </DetailsBar>
  </CardFixed>
);

const ThingHoverBoxHidden = () => (
  <React.Fragment>
    <Property label={NS.schema('text')} />
  </React.Fragment>
);

const ThingSection = ({ highlighted }) => (
  <CardHoverBox hiddenChildren={<ThingHoverBoxHidden />} shine={highlighted}>
    <Property label={NS.schema('name')} />
  </CardHoverBox>
);

ThingSection.propTypes = hightlightPropTypes;

const ThingCard = () => (
  <CardRow>
    <CardContent>
      <Property label={NS.argu('opinion')} />
      <Property label={[NS.schema('name'), NS.rdfs('label'), NS.schema('name')]} />
      <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
      <Property label={NS.meeting('attachment')} />
    </CardContent>
  </CardRow>
);

export default [
  ThingContainer,
  ThingPage,
  ThingPageHeader,
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
    NS.schema('Thing'),
    RENDER_CLASS_NAME,
    [
      cardRowTopology,
      cardListTopology,
    ]
  ),
  LinkedRenderStore.registerRenderer(
    link([NS.schema('name')])(({ name, theme }) => (
      <LDLink data-test="Thing-parent" features={['centered']} theme={theme}>
        <Detail text={name.value} />
      </LDLink>
    )),
    NS.schema('Thing'),
    RENDER_CLASS_NAME,
    detailsBarTopology
  ),
  LinkedRenderStore.registerRenderer(
    ThingGrid,
    NS.schema('Thing'),
    RENDER_CLASS_NAME,
    gridTopology
  ),
  LinkedRenderStore.registerRenderer(
    ThingCard,
    NS.schema('Thing'),
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
  CoverPhoto,
  CreateAction,
  DateCreated,
  DateSubmitted,
  description,
  ExpiresAt,
  FollowsCount,
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
  ...Text,
  TopComment,
  TrashedAt,
  UpdateAction,
  VoteEvents,
];
