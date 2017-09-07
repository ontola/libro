import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React, { PropTypes } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  LinkCard,
} from '../../components';
import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

import './properties/collectionAssociation';
import './properties/isPrimaryTopicOf';
import './properties/isPartOf';
import './properties/image';
import './properties/menus';
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

LinkedRenderStore.registerRenderer(Thing, NS.schema('Thing'));
LinkedRenderStore.registerRenderer(
  Thing,
  NS.schema('Thing'),
  RENDER_CLASS_NAME,
  NS.argu('collection')
);

LinkedRenderStore.registerRenderer(
  () => <Property label={[NS.schema('name'), NS.rdfs('label')]} />,
  NS.schema('Thing'),
  RENDER_CLASS_NAME,
  NS.argu('inline')
);

LinkedRenderStore.registerRenderer(
  () => <Property label={[NS.schema('name'), NS.rdfs('label')]} />,
  NS.schema('Thing'),
  RENDER_CLASS_NAME,
  NS.argu('section')
);


LinkedRenderStore.registerRenderer(
  () => <LinkCard><Property label={[NS.schema('name'), NS.rdfs('label')]} /></LinkCard>,
  NS.schema('Thing'),
  RENDER_CLASS_NAME,
  NS.argu('parent')
);
