import { Property, register } from 'link-redux';
import React from 'react';

import LDLink from '../../components/LDLink';
import { NS } from '../../helpers/LinkedRenderStore';
import { inlineTopology } from '../../topologies/Inline';

class ThingInline extends React.PureComponent {
  static type = NS.schema('Thing');

  static mapDataToProps = [NS.rdf('type')];

  static topology = inlineTopology;

  render() {
    return (
      <LDLink features={['bold']}>
        <Property label={[NS.schema('name'), NS.rdfs('label')]} />
      </LDLink>
    );
  }
}

export default register(ThingInline);