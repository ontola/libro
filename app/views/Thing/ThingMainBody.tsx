import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import AllWithProperty from '../../components/AllWithProperty';
import LDLink from '../../components/LDLink';
import ResourceBoundary from '../../components/ResourceBoundary';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import meeting from '../../ontology/meeting';
import { mainBodyTopology } from '../../topologies';

const ThingMainBody = () => (
  <ResourceBoundary>
    <LDLink>
      <Property label={[schema.name, rdfs.label, foaf.name]} />
    </LDLink>
    <Property label={[schema.text, schema.description, dbo.abstract]} />
    <AllWithProperty label={[argu.attachments, meeting.attachment]} />
  </ResourceBoundary>
);

ThingMainBody.type = schema.Thing;

ThingMainBody.topology = mainBodyTopology;

export default register(ThingMainBody);
