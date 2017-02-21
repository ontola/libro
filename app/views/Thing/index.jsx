import React, { PropTypes } from 'react';
import { Property } from 'link-redux';
import { RENDER_CLASS_NAME } from 'link-lib';

import LinkedRenderStore from '../../helpers/LinkedRenderStore';

import {
  Card,
  CardContent,
  CardHeader,
} from 'components';

const propTypes = {
  object: PropTypes.string,
};

const Thing = ({ object }) => (
  <Card>
    <CardHeader noSpacing>
      <Property label={['schema:name', 'rdfs:label']} />
      <Property label={['dbo:thumbnail', 'wdt:P18']} />
    </CardHeader>
    <CardContent noSpacing>
      <Property label={['schema:text', 'schema:description', 'dbo:abstract']} object={object} />
      <Property label="foaf:isPrimaryTopicOf" />
    </CardContent>
  </Card>
);

Thing.propTypes = propTypes;

LinkedRenderStore.registerRenderer(Thing, 'http://schema.org/Thing');

LinkedRenderStore.registerRenderer(
  () => <Property label={['schema:name', 'rdfs:label']} />,
  'http://schema.org/Thing',
  RENDER_CLASS_NAME,
  'inline'
);

LinkedRenderStore.registerRenderer(
  () => <Property label={['schema:name', 'rdfs:label']} />,
  'http://schema.org/Thing',
  RENDER_CLASS_NAME,
  'section'
);

export { default as collectionAssociation } from './properties/collectionAssociation';
export { default as IsPrimaryTopicOf } from './properties/isPrimaryTopicOf';
export { default as Image } from './properties/image';
export { default as Name } from './properties/name';
export { default as Text } from './properties/text';
export { default as UpdateAction } from './properties/updateAction';
