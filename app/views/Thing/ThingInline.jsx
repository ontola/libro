import * as foaf from '@ontologies/foaf';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import LDLink from '../../components/LDLink';
import { attributeListTopology } from '../../topologies/AttributeList';
import { inlineTopology } from '../../topologies/Inline';

class ThingInline extends React.PureComponent {
  static type = schema.Thing;

  static topology = [attributeListTopology, inlineTopology];

  static mapDataToProps = {
    type: rdfx.type,
  };

  render() {
    return (
      <LDLink features={['bold']}>
        <Property label={[schema.name, rdfs.label, foaf.name]} />
      </LDLink>
    );
  }
}

export default register(ThingInline);
