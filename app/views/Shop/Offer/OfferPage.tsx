import { isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React from 'react';
import { Redirect } from 'react-router';

import { retrievePath } from '../../../helpers/iris';
import FullResource from '../../../topologies/FullResource';
import { pageTopology } from '../../../topologies/Page';

interface OfferPageProps {
  partOf: SomeNode;
}

const OfferPage: FC<OfferPageProps> = (props) => {
  if (isNamedNode(props.partOf)) {
    return (
      <Redirect to={retrievePath(props.partOf)!} />
    );
  }

  return (
    <FullResource>
      <Resource
        renderPartOf
        {...props}
      />
    </FullResource>
  );
};

OfferPage.type = schema.Offer;

OfferPage.topology = pageTopology;

OfferPage.mapDataToProps = {
  partOf: schema.isPartOf,
};

export default register(OfferPage);
