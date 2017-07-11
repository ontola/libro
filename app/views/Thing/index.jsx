import React, { PropTypes } from 'react';
import { Property } from 'link-redux';
import { RENDER_CLASS_NAME } from 'link-lib';

import {
  Card,
  CardContent,
  CardHeader,
} from 'components';

import LinkedRenderStore from '../../helpers/LinkedRenderStore';

import './properties/collectionAssociation';
import './properties/isPrimaryTopicOf';
import './properties/menus';
import './properties/image';
import './properties/name';
import './properties/organization';
import './properties/text';
import './properties/updateAction';

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
