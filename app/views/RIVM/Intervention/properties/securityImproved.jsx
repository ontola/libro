import {
  Resource,
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';

import rivm from '../../../../ontology/rivm';
import { cardMainTopology } from '../../../../topologies/Card/CardMain';
import { inlineTopology } from '../../../../topologies/Inline';

const SecurityImproved = ({ linkedProp }) => {
  if (linkedProp.value === 'Weet niet') {
    return 'Het is onbekend of de veiligheid door het uitvoeren van de interventie is verbeterd.';
  }

  return (
    <React.Fragment>
      <span>De veiligheid is door het uitvoeren van de interventie naar inschatting </span>
      <span style={{ textTransform: 'lowercase' }}><strong><Resource subject={linkedProp} topology={inlineTopology} /></strong></span>
      <span> verbeterd.</span>
    </React.Fragment>
  );
};

SecurityImproved.type = rivm.Intervention;

SecurityImproved.topology = cardMainTopology;

SecurityImproved.property = rivm.securityImproved;

SecurityImproved.propTypes = {
  linkedProp: linkedPropType,
};

export default register(SecurityImproved);
