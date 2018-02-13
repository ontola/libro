import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link, Property } from 'link-redux';
import React from 'react';

import {
  Card,
  CardContent,
  CardFixed,
  CardMain,
  CardMenuFloater,
  CardRow,
  Container,
  Detail,
  DetailsBar,
  HoverBox,
  LDLink,
  LinkCard,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

import BaseColor from './properties/baseColor';
import Contains from './properties/contains';
import CollectionAssociation from './properties/collectionAssociation';
import CoverPhoto from './properties/coverPhoto';
import DateCreated from './properties/dateCreated';
import IsPrimaryTopicOf from './properties/isPrimaryTopicOf';
import IsPartOf from './properties/isPartOf';
import Image from './properties/image';
import Menus from './properties/menus';
import Name from './properties/name';
import Organization from './properties/organization';
import Text from './properties/text';
import UpdateAction from './properties/updateAction';

const ThingPage = () => (
  <div>
    <Property label={NS.argu('coverPhoto')} />
    <Container>
      <Property label={NS.schema('isPartOf')} />
      <CardMain data-test="Thing-thing">
        <CardContent noSpacing>
          <CardMenuFloater
            header={<Property label={[NS.schema('name'), NS.rdfs('label')]} />}
          >
            <Property label={NS.argu('actionsMenu')} />
            <Property label={NS.argu('followMenu')} />
            <Property label={NS.argu('shareMenu')} />
            <Property label={NS.argu('actionsMenu')} />
          </CardMenuFloater>
          <DetailsBar>
            <Property label={NS.schema('creator')} />
            <Property label={NS.schema('dateCreated')} />
          </DetailsBar>
          <Property label={[NS.dbo('thumbnail'), NS.wdt('P18')]} />
          <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
          <Property label={NS.foaf('isPrimaryTopicOf')} />
        </CardContent>
        <Property label={NS.argu('attachments')} />
        <Property label={NS.council('attachment')} />
        <Property label={NS.council('agenda')} />
      </CardMain>
      <Property label={NS.argu('blogPosts')} />
      <Property label={NS.schema('comments')} />
      <Property label={NS.argu('arguments')} />
      <Property label={NS.argu('motions')} />
    </Container>
  </div>
);

const ThingContainer = () => (
  <Card>
    <Property label={NS.argu('coverPhoto')} />
    <CardContent noSpacing>
      <Property label={[NS.schema('name'), NS.rdfs('label')]} />
      <DetailsBar>
        <Property label={NS.schema('creator')} />
        <Property label={NS.schema('dateCreated')} />
      </DetailsBar>
      <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
      <Property label={NS.argu('arguments')} />
    </CardContent>
  </Card>
);

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
  <div>
    <DetailsBar>
      <Property label={NS.schema('creator')} />
      <Property label={NS.schema('dateCreated')} />
    </DetailsBar>
    <Property label={NS.schema('text')} />
  </div>
);

const ThingSection = () => (
  <HoverBox hiddenChildren={<ThingHoverBoxHidden />}>
    <Property label={NS.schema('name')} topology={NS.argu('inline')} />
  </HoverBox>
);

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
    ThingSection,
    NS.schema('Thing'),
    RENDER_CLASS_NAME,
    [NS.argu('section'), NS.argu('cardRow')]
  ),
  LinkedRenderStore.registerRenderer(
    () => <LinkCard data-test="Thing-parent"><Property label={[NS.schema('name'), NS.rdfs('label')]} /></LinkCard>,
    NS.schema('Thing'),
    RENDER_CLASS_NAME,
    NS.argu('parent')
  ),
  LinkedRenderStore.registerRenderer(
    link([NS.schema('name'), NS.schema('image')])(({ image, name }) => (
      <LDLink>
        <Detail
          data-test="Thing-parent"
          linkedImage={!!image}
          text={name.value}
        />
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
    ThingContainer,
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
  BaseColor,
  Contains,
  CollectionAssociation,
  CoverPhoto,
  DateCreated,
  IsPrimaryTopicOf,
  IsPartOf,
  Image,
  Menus,
  ...Name,
  Organization,
  ...Text,
  UpdateAction,
];
