import React, { PropTypes } from 'react';
import { Property } from 'link-redux';
import { defaultNS as NS, RENDER_CLASS_NAME } from 'link-lib';

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
      <Property label={[NS.schema('name'), NS.rdfs('label')]} />
      <Property label={[NS.dbo('thumbnail'), NS.wdt('P18')]} />
    </CardHeader>
    <CardContent noSpacing>
      <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} object={object} />
      <Property label={NS.foaf('isPrimaryTopicOf')} />
    </CardContent>
  </Card>
);

Thing.propTypes = propTypes;

LinkedRenderStore.registerRenderer(Thing, 'http://schema.org/Thing');

LinkedRenderStore.registerRenderer(
  () => <Property label={['schema:name', 'rdfs:label']} />,
  'http://schema.org/Thing',
  RENDER_CLASS_NAME,
  NS.argu('inline')
);

LinkedRenderStore.registerRenderer(
  () => <Property label={['schema:name', 'rdfs:label']} />,
  'http://schema.org/Thing',
  RENDER_CLASS_NAME,
  NS.argu('section')
);
