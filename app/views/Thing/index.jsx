import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  link,
  Property,
  subjectType,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import {
  Card,
  CardAppendix,
  CardContent,
  CardFixed,
  CardMain,
  CardMenuFloater,
  CardRow,
  Container,
  Detail,
  DetailsBar,
  hoverBox,
  LDLink,
  Resource,
} from '../../components';
import {
  connectHighlighting,
  hightlightPropTypes,
  hightlightType,
} from '../../containers/Highlight';
import SignInSwitcherContainer from '../../containers/SignInSwitcherContainer';
import { NS } from '../../helpers/LinkedRenderStore';

import Arguments from './properties/arguments';
import BaseColor from './properties/baseColor';
import CollectionAssociation from './properties/collectionAssociation';
import CoverPhoto from './properties/coverPhoto';
import CreateAction from './properties/createAction';
import DateCreated from './properties/dateCreated';
import IsPrimaryTopicOf from './properties/isPrimaryTopicOf';
import IsPartOf from './properties/isPartOf';
import Image from './properties/image';
import Location from './properties/location';
import Menus from './properties/menus';
import Name from './properties/name';
import Omniform from './properties/omniform';
import Organization from './properties/organization';
import PotentialAction from './properties/potentialAction';
import SuperEvent from './properties/superEvent';
import Text from './properties/text';
import TrashedAt from './properties/trashedAt';
import UpdateAction from './properties/updateAction';
import VoteEvents from './properties/voteEvents';

const CardHoverBox = hoverBox();

const ThingPage = () => (
  <Resource>
    <Property label={NS.argu('coverPhoto')} />
    <Container>
      <Property label={NS.schema('isPartOf')} />
      <Property label={NS.argu('trashedAt')} />
      <CardMain data-test="Thing-thing">
        <Property label={NS.schema('superEvent')} />
        <CardContent noSpacing>
          <CardMenuFloater
            header={<Property label={[NS.schema('name'), NS.rdfs('label')]} />}
          >
            <Property label={NS.argu('followMenu')} />
            <Property label={NS.argu('shareMenu')} />
            <Property label={NS.argu('actionsMenu')} />
          </CardMenuFloater>
          <DetailsBar>
            <Property label={NS.rdf('type')} />
            <Property label={NS.schema('creator')} />
            <Property label={NS.schema('dateCreated')} />
            <Property label={NS.schema('location')} />
          </DetailsBar>
          <Property label={[NS.dbo('thumbnail'), NS.wdt('P18')]} />
          <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
          <Property label={NS.foaf('isPrimaryTopicOf')} />
          <Property label={NS.council('attachment')} />
          <Property label={NS.argu('attachments')} />
        </CardContent>
        <Property label={NS.council('agenda')} />
      </CardMain>
      <Property label={NS.argu('voteEvents')} />
      <Property label={NS.argu('blogPosts')} />
      <Property label={NS.argu('motions')} />
    </Container>
    <Container size="large">
      <Property forceRender label={NS.argu('arguments')} />
    </Container>
    <Container>
      <Property label={NS.schema('comments')} />
      <Property forceRender label={NS.app('omniform')} />
    </Container>
  </Resource>
);

const ThingContainer = ({ highlighted, subject }) => (
  <Card about={subject.value} shine={highlighted}>
    <Property label={NS.argu('coverPhoto')} />
    <CardContent noSpacing>
      <Property label={[NS.schema('name'), NS.rdfs('label')]} />
      <DetailsBar>
        <Property label={NS.schema('creator')} />
        <Property label={NS.schema('dateCreated')} />
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
      <Property label={[NS.schema('name'), NS.rdfs('label'), NS.argu('label')]} />
      <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
      <Property label={NS.council('attachment')} />
    </CardContent>
  </CardRow>
);

export default [
  LinkedRenderStore.registerRenderer(ThingPage, NS.schema('Thing')),
  LinkedRenderStore.registerRenderer(
    ThingPage,
    NS.schema('Thing'),
    RENDER_CLASS_NAME,
    NS.argu('collection')
  ),
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
      NS.argu('section'),
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
    NS.argu('container')
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
  CollectionAssociation,
  CoverPhoto,
  CreateAction,
  DateCreated,
  IsPrimaryTopicOf,
  ...IsPartOf,
  Image,
  Location,
  Menus,
  ...Name,
  ...Omniform,
  Organization,
  SuperEvent,
  ...PotentialAction,
  ...Text,
  TrashedAt,
  UpdateAction,
  VoteEvents,
];
