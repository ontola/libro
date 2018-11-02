import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link, Property, subjectType } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import {
  CardContent,
  Detail,
  LDLink,
} from '../../components';
import {
  connectHighlighting,
  hightlightPropTypes,
  hightlightType,
} from '../../containers/Highlight';
import SignInSwitcherContainer from '../../containers/SignInSwitcherContainer';
import { NS } from '../../helpers/LinkedRenderStore';
import Card, { cardTopology } from '../../topologies/Card';
import CardAppendix from '../../topologies/Card/CardAppendix';
import CardFixed, { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardListTopology } from '../../topologies/Card/CardList';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import CardRow, { cardRowTopology } from '../../topologies/Card/CardRow';
import { containerTopology } from '../../topologies/Container';
import DetailsBar, { detailsBarTopology } from '../../topologies/DetailsBar';
import { alertDialogTopology } from '../../topologies/Dialog';
import { gridTopology } from '../../topologies/Grid';
import hoverBox from '../../topologies/HoverBox';
import { inlineTopology } from '../../topologies/Inline';
import { parentTopology } from '../../topologies/Parent';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';

import Arguments from './properties/arguments';
import BaseColor from './properties/baseColor';
import CoverPhoto from './properties/coverPhoto';
import CreateAction from './properties/createAction';
import DateCreated from './properties/dateCreated';
import ExpiresAt from './properties/expiresAt';
import FollowsCount from './properties/followsCount';
import Image from './properties/image';
import IsPartOf from './properties/isPartOf';
import IsPrimaryTopicOf from './properties/isPrimaryTopicOf';
import Location from './properties/location';
import Menus from './properties/menus';
import MotionsCount from './properties/motionsCount';
import Name from './properties/name';
import Omniform from './properties/omniform';
import Organization from './properties/organization';
import PinnedAt from './properties/pinnedAt';
import PotentialAction from './properties/potentialAction';
import SuperEvent from './properties/superEvent';
import Text from './properties/text';
import TrashedAt from './properties/trashedAt';
import UpdateAction from './properties/updateAction';
import VoteEvents from './properties/voteEvents';
import ThingPage from './ThingPage';
import ThingSelect from './ThingSelect';

const CardHoverBox = hoverBox();

const ThingContainer = ({ highlighted, subject }) => (
  <Card about={subject.value} shine={highlighted}>
    <Property label={NS.argu('coverPhoto')} />
    <CardContent noSpacing>
      <Property label={[NS.schema('name'), NS.rdfs('label')]} />
      <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
    </CardContent>
    <Property label={NS.argu('voteableVoteEvent')} />
    <CardAppendix>
      <SignInSwitcherContainer subject={subject}>
        <Property forceRender label={NS.argu('arguments')} />
        <Property label={NS.argu('topComment')} />
        <Property forceRender label={NS.app('omniform')} />
      </SignInSwitcherContainer>
    </CardAppendix>
  </Card>
);

ThingContainer.propTypes = {
  highlighted: hightlightType,
  subject: subjectType,
};

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
    <DetailsBar>
      <Property label={NS.schema('creator')} />
      <Property label={NS.schema('dateCreated')} />
    </DetailsBar>
    <Property label={NS.schema('text')} />
  </React.Fragment>
);

const ThingParent = () => (
  <LDLink>
    <div data-test="Thing-parent" style={{ alignItems: 'center', display: 'inline-flex', padding: '1em 1em 0em 1em' }}>
      <FontAwesome name="arrow-up" style={{ marginRight: '.5em' }} />
      <Property data-test="Thing-parent" label={[NS.schema('name'), NS.rdfs('label')]} />
    </div>
  </LDLink>
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
      <Property label={[NS.schema('name'), NS.rdfs('label'), NS.schema('name')]} />
      <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
      <Property label={NS.meeting('attachment')} />
    </CardContent>
  </CardRow>
);

export default [
  ThingPage,
  ThingSelect,
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
    ThingParent,
    NS.schema('Thing'),
    RENDER_CLASS_NAME,
    parentTopology
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
    connectHighlighting(ThingContainer),
    NS.schema('Thing'),
    RENDER_CLASS_NAME,
    [
      alertDialogTopology,
      primaryResourceTopology,
      containerTopology,
    ]
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
  ...Arguments,
  BaseColor,
  CoverPhoto,
  CreateAction,
  DateCreated,
  ExpiresAt,
  FollowsCount,
  IsPrimaryTopicOf,
  ...IsPartOf,
  Image,
  Location,
  Menus,
  MotionsCount,
  ...Name,
  ...Omniform,
  Organization,
  PinnedAt,
  SuperEvent,
  ...PotentialAction,
  ...Text,
  TrashedAt,
  UpdateAction,
  VoteEvents,
];
