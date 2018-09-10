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
import Card from '../../topologies/Card';
import CardAppendix from '../../topologies/Card/CardAppendix';
import CardFixed from '../../topologies/Card/CardFixed';
import CardRow from '../../topologies/Card/CardRow';
import DetailsBar from '../../topologies/DetailsBar';
import hoverBox from '../../topologies/HoverBox';

import Arguments from './properties/arguments';
import BaseColor from './properties/baseColor';
import CoverPhoto from './properties/coverPhoto';
import CreateAction from './properties/createAction';
import DateCreated from './properties/dateCreated';
import ExpiresAt from './properties/expiresAt';
import Image from './properties/image';
import IsPartOf from './properties/isPartOf';
import IsPrimaryTopicOf from './properties/isPrimaryTopicOf';
import Location from './properties/location';
import Menus from './properties/menus';
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

const CardHoverBox = hoverBox();

const ThingContainer = ({ highlighted, subject }) => (
  <Card about={subject.value} shine={highlighted}>
    <Property label={NS.argu('coverPhoto')} />
    <CardContent noSpacing>
      <Property label={[NS.schema('name'), NS.rdfs('label')]} />
      <DetailsBar>
        <Property label={NS.schema('creator')} />
        <Property label={NS.schema('dateCreated')} />
        <Property label={NS.argu('expiresAt')} />
        <Property label={NS.argu('pinnedAt')} />
      </DetailsBar>
      <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
    </CardContent>
    <Property label={NS.argu('voteableVoteEvent')} />
    <CardAppendix>
      <SignInSwitcherContainer subject={subject}>
        <Property forceRender label={NS.argu('arguments')} />
        <Property label={NS.schema('comments')} />
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
      <DetailsBar>
        <Property label={NS.schema('creator')} />
        <Property label={NS.schema('dateCreated')} />
        <Property label={NS.argu('expiresAt')} />
        <Property label={NS.argu('pinnedAt')} />
      </DetailsBar>
      <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
    </CardContent>
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
  LinkedRenderStore.registerRenderer(
    () => <Property label={[NS.schema('name'), NS.rdfs('label')]} />,
    NS.schema('Thing'),
    RENDER_CLASS_NAME,
    NS.argu('inline')
  ),
  LinkedRenderStore.registerRenderer(
    connectHighlighting(ThingSection),
    NS.schema('Thing'),
    RENDER_CLASS_NAME,
    [
      NS.argu('cardRow'),
      NS.argu('cardList'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    ThingParent,
    NS.schema('Thing'),
    RENDER_CLASS_NAME,
    NS.argu('parent')
  ),
  LinkedRenderStore.registerRenderer(
    link([NS.schema('name')])(({ name, theme }) => (
      <LDLink data-test="Thing-parent" theme={theme}>
        <Detail text={name.value} />
      </LDLink>
    )),
    NS.schema('Thing'),
    RENDER_CLASS_NAME,
    NS.argu('detail')
  ),
  LinkedRenderStore.registerRenderer(
    ThingGrid,
    NS.schema('Thing'),
    RENDER_CLASS_NAME,
    NS.argu('grid')
  ),
  LinkedRenderStore.registerRenderer(
    connectHighlighting(ThingContainer),
    NS.schema('Thing'),
    RENDER_CLASS_NAME,
    [
      undefined,
      NS.argu('container'),
    ]
  ),
  LinkedRenderStore.registerRenderer(
    ThingCard,
    NS.schema('Thing'),
    RENDER_CLASS_NAME,
    [
      NS.argu('card'),
      NS.argu('cardFixed'),
      NS.argu('cardMain'),
    ]
  ),
  ...Arguments,
  BaseColor,
  CoverPhoto,
  CreateAction,
  DateCreated,
  ExpiresAt,
  IsPrimaryTopicOf,
  ...IsPartOf,
  Image,
  Location,
  Menus,
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
