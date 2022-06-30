import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  PropertyProps,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { mainBodyTopology } from '../../../../Common/topologies/MainBody';
import { MenuTypes } from '../types';

const IsPartOfMain: FC<PropertyProps> = ({
  linkedProp,
}) => (
  <Resource subject={linkedProp}>
    <Property label={[schema.name, rdfs.label, foaf.name]} />
    <Property label={schema.description} />
  </Resource>
);

IsPartOfMain.type = MenuTypes;

IsPartOfMain.property = schema.isPartOf;

IsPartOfMain.topology = [
  mainBodyTopology,
];

export default register(IsPartOfMain);
