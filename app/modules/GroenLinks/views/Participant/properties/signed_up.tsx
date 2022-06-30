import { PropertyProps, register } from 'link-redux';
import React from 'react';

import Detail from '../../../../Common/components/Detail';
import { contentDetailsTopology } from '../../../../Common/topologies/ContentDetails';
import { detailsBarTopology } from '../../../../Common/topologies/DetailsBar';
import teamGL from '../../../ontology/teamGL';

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
