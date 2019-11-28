import { literalShape } from '@ontola/mash';
import schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { cardListTopology } from '../../topologies/Card/CardList';
import { cardMicroRowTopology } from '../../topologies/Card/CardMicroRow';

const propTypes = {
  name: literalShape,
};

const PersonSection = ({ name }) => (
  <b
    style={{
      color: '#707070',
      fontWeight: 'bold',
    }}
  >
    {name.value}
  </b>
);

PersonSection.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  link({ name: schema.name })(PersonSection),
  [schema.Person, schema.Organization, argu.Page],
  RENDER_CLASS_NAME,
  [cardListTopology, cardMicroRowTopology]
);
