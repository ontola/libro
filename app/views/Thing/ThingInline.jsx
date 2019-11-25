import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import LDLink from '../../components/LDLink';
import { attributeListTopology } from '../../topologies/AttributeList';
import { inlineTopology } from '../../topologies/Inline';

class ThingInline extends React.PureComponent {
  static type = schema.Thing;

  static mapDataToProps = {
    type: rdfx.type,
  };

  static topology = [attributeListTopology, inlineTopology];

  render() {
    return (
      <LDLink features={['bold']}>
        <Property label={[schema.name, rdfs.label]} />
      </LDLink>
    );
  }
}

export default register(ThingInline);
