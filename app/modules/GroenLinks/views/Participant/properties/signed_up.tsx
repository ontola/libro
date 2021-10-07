import { PropertyProps, register } from 'link-redux';
import React from 'react';

import Detail from '../../../../../components/Detail';
import teamGL from '../../../../../ontology/teamGL';
import { contentDetailsTopology } from '../../../../../topologies/ContentDetails';
import { detailsBarTopology } from '../../../../../topologies/DetailsBar';

const SignedUp = ({ linkedProp }: PropertyProps) => {
  if (linkedProp.value === 'true') {
    return (
      <Detail
        icon="exclamation"
        text="aangemeld via GLAPP"
      />
    );
  }

  return null;
};

SignedUp.type = teamGL.Participant;

SignedUp.topology = [
  contentDetailsTopology,
  detailsBarTopology,
];

SignedUp.property = teamGL.signedUp;

export default register(SignedUp);
