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
import { inlineTopology } from '../../topologies/Inline';

import ApplyLink from './properties/applyLink';
import ArguLocation from './properties/arguLocation';
import Arguments from './properties/arguments';
import BaseColor from './properties/baseColor';
import CoverPhoto from './properties/coverPhoto';
import CreateAction from './properties/createAction';
import DateCreated from './properties/dateCreated';
import DateSubmitted from './properties/dateSubmitted';
import description from './properties/description';
import Email from './properties/email';
import ExpiresAt from './properties/expiresAt';
import FollowsCount from './properties/followsCount';
import Image from './properties/image';
import Invitee from './properties/invitee';
import IsPartOf from './properties/isPartOf';
import IsPrimaryTopicOf from './properties/isPrimaryTopicOf';
import Location from './properties/location';
import MakePrimaryAction from './properties/makePrimaryAction';
import Member from './properties/member';
import Menus from './properties/menus';
import MotionsCount from './properties/motionsCount';
import Name from './properties/name';
import Omniform from './properties/omniform';
import Organization from './properties/organization';
import PinnedAt from './properties/pinnedAt';
import PotentialAction from './properties/potentialAction';
import PublishAction from './properties/publishAction';
import SendConfirmationAction from './properties/sendConfirmationAction';
import SuperEvent from './properties/superEvent';
import Text from './properties/text';
import TopComment from './properties/topComment';
import TrashedAt from './properties/trashedAt';
import UpdateAction from './properties/updateAction';
import VoteEvents from './properties/voteEvents';
import ThingContainer from './ThingContainer';
import ThingPage from './ThingPage';
import ThingPageHeader from './ThingPageHeader';
import ThingParent from './ThingParent';
import ThingPopup from './ThingPopup';
import ThingSelect from './ThingSelect';
import ThingTable from './ThingTable';
import ThingTableRow from './ThingTableRow';

const CardHoverBox = hoverBox();

const ThingGrid = () => (
  <CardFixed>
    <Property label={NS.argu('coverPhoto')} />
    <CardContent noSpacing>
      <Property label={[NS.schema('name'), NS.rdfs('label')]} />
      <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
    </CardContent>
    <DetailsBar>
      <Property label={NS.argu('pinnedAt')} />
      <Property short label={NS.argu('expiresAt')} />
      <Property label={NS.schema('creator')}>
        <LDLink>
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
  ThingTableRow,
  ThingParent,
  ThingPopup,
  LinkedRenderStore.registerRenderer(
    () => <Property label={[NS.schema('name'), NS.rdfs('label')]} />,
    NS.schema('Thing'),
    RENDER_CLASS_NAME,
    inlineTopology
  ),
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
      <LDLink data-test="Thing-parent" theme={theme}>
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
  BaseColor,
  CoverPhoto,
  CreateAction,
  DateCreated,
  DateSubmitted,
  description,
  Email,
  ExpiresAt,
  FollowsCount,
  IsPrimaryTopicOf,
  IsPartOf,
  Image,
  Invitee,
  Location,
  MakePrimaryAction,
  Member,
  Menus,
  MotionsCount,
  ...Name,
  ...Omniform,
  Organization,
  PinnedAt,
  SendConfirmationAction,
  SuperEvent,
  ...PotentialAction,
  PublishAction,
  ...Text,
  TopComment,
  TrashedAt,
  UpdateAction,
  VoteEvents,
];
