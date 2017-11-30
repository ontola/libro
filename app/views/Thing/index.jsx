import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  Card,
  CardContent,
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

const propTypes = {
  object: PropTypes.string,
};

const Thing = ({ object }) => (
  <Card>
    <CardContent noSpacing>
      <Property label={[NS.schema('name'), NS.rdfs('label')]} />
      <Property label={[NS.dbo('thumbnail'), NS.wdt('P18')]} />
      <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} object={object} />
      <Property label={NS.foaf('isPrimaryTopicOf')} />
    </CardContent>
  </Card>
);

Thing.propTypes = propTypes;

export default [
  LinkedRenderStore.registerRenderer(Thing, NS.schema('Thing')),
  LinkedRenderStore.registerRenderer(
    Thing,
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
    () => <LinkCard><Property label={[NS.schema('name'), NS.rdfs('label')]} /></LinkCard>,
    NS.schema('Thing'),
    RENDER_CLASS_NAME,
    NS.argu('parent')
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
