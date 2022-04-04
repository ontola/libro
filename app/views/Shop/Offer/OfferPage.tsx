import { isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import { Redirect } from 'react-router';

import { retrievePath } from '../../../helpers/iris';
import { pageTopology } from '../../../topologies';
import FullResource from '../../../topologies/FullResource';

const OfferPage: FC = ({
  subject,
}) => {
  const [partOf] = useProperty(schema.isPartOf);

  if (isNamedNode(partOf)) {
    return (
      <Redirect to={retrievePath(partOf)!} />
    );
  }

  return (
    <FullResource>
      <Property label={schema.isPartOf} />
      <Resource subject={subject} />
    </FullResource>
  );
};

OfferPage.type = schema.Offer;

OfferPage.topology = pageTopology;

export default register(OfferPage);
