import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import LDLink from '../../components/LDLink';
import { LinkFeature } from '../../components/Link';
import { attributeListTopology, inlineTopology } from '../../topologies';

const ThingInline = () => (
  <LDLink features={[LinkFeature.Bold]}>
    <Property label={[schema.name, rdfs.label, foaf.name]} />
  </LDLink>
);

ThingInline.type = schema.Thing;

ThingInline.topology = [attributeListTopology, inlineTopology];

export default register(ThingInline);
