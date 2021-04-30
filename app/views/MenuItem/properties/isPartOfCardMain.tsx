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

import CardContent from '../../../components/Card/CardContent';
import ontola from '../../../ontology/ontola';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { MenuTypes } from '../types';

const IsPartOfCardMain: FC<PropertyProps> = ({
  linkedProp,
}) => (
  <Resource subject={linkedProp}>
    <Property label={ontola.coverPhoto} />
    <CardContent>
      <Property label={[schema.name, rdfs.label, foaf.name]} />
      <Property label={schema.description} />
    </CardContent>
  </Resource>
);

IsPartOfCardMain.type = MenuTypes;

IsPartOfCardMain.property = schema.isPartOf;

IsPartOfCardMain.topology = cardMainTopology;

export default register(IsPartOfCardMain);
