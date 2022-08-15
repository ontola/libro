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
import { useNavigate } from 'react-router';

import { retrievePath } from '../../../../Common/lib/iris';
import { pageTopology } from '../../../../Common/topologies';
import FullResource from '../../../../Common/topologies/FullResource';

const OfferPage: FC = ({
  subject,
}) => {
  const [partOf] = useProperty(schema.isPartOf);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isNamedNode(partOf)) {
      navigate(retrievePath(partOf.value)!, { replace: true });
    }
  }, [partOf]);

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
