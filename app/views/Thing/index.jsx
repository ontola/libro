import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import {
  Card,
  CardContent,
  CardMain,
  CardMenuFloater,
  Container,
  DetailsBar,
  HoverBox,
  LDLink,
  LinkCard,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

import BaseColor from './properties/baseColor';
import Contains from './properties/contains';
import CollectionAssociation from './properties/collectionAssociation';
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
      <Property label={NS.argu('motions')} />
      <Property label={NS.argu('arguments')} />
      <Property label={NS.argu('comments')} />
    </Container>
  </div>
);

const ThingContainer = () => (
  <Card>
    <LDLink>
      <Property label={NS.argu('coverPhoto')} />
    </LDLink>
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
  <Card fixed>
    <LDLink>
      <Property label={NS.argu('coverPhoto')} />
    </LDLink>
    <CardContent noSpacing>
      <Property label={[NS.schema('name'), NS.rdfs('label')]} />
      <DetailsBar>
        <Property label={NS.schema('creator')} />
        <Property label={NS.schema('dateCreated')} />
      </DetailsBar>
      <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
    </CardContent>
  </Card>
);

const HiddenChildren = () => (
  <Property label={NS.schema('text')} />
);

const ThingSection = () => (
  <HoverBox hiddenChildren={<HiddenChildren />}>
    <Property label={NS.schema('name')} topology={NS.argu('inline')} />
  </HoverBox>
);

const ThingCard = () => (
  <Property label={[NS.schema('name'), NS.rdfs('label'), NS.argu('label')]} />
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
    () => <Property label={[NS.schema('name'), NS.rdfs('label')]} />,
    NS.schema('Thing'),
    RENDER_CLASS_NAME,
    NS.argu('section')
  ),
  LinkedRenderStore.registerRenderer(
    () => <LinkCard data-test="Thing-parent"><Property label={[NS.schema('name'), NS.rdfs('label')]} /></LinkCard>,
    NS.schema('Thing'),
    RENDER_CLASS_NAME,
    NS.argu('parent')
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
      NS.argu('cardMain'),
    ]
  ),
  BaseColor,
  Contains,
  CollectionAssociation,
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
