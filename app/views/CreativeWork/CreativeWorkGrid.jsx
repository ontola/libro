import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import dbo from '../../ontology/dbo';
import { gridTopology } from '../../topologies/Grid';

class CreativeWorkGrid extends React.PureComponent {
  static type = schema.CreativeWork;

  static topology = gridTopology;

  render() {
    return (
      <React.Fragment>
        <Property label={[schema.name, rdfs.label]} />
        <Property label={[schema.text, schema.description, dbo.abstract]} />
      </React.Fragment>
    );
  }
}

export default register(CreativeWorkGrid);
