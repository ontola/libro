import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import dbo from '../../../../ontology/dbo';
import { footerTopology } from '../../../../topologies';

const ThingFooter = (): JSX.Element => (
  <React.Fragment>
    <Property label={[schema.name, rdfs.label, foaf.name]} />
    <Property label={[schema.text, schema.description, dbo.abstract]} />
  </React.Fragment>
);

ThingFooter.type = schema.Thing;

ThingFooter.topology = footerTopology;

export default register(ThingFooter);
